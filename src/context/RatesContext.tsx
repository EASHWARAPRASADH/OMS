import React, { createContext, useContext, useState, useEffect } from 'react';
import { MetalRate } from '../types';
import { METAL_RATES } from '../data/jewelryData';

interface RatesContextType {
  rates: MetalRate[];
  loading: boolean;
  error: string | null;
  refreshRates: () => Promise<void>;
  lastUpdated: string;
  updateTime: string;
  lbmaGoldAm: string;
  lbmaGoldAmDate: string;
  lbmaGoldPm: string;
  lbmaGoldPmDate: string;
  lbmaSilverAm: string;
  lbmaSilverAmDate: string;
  lbmaSilverPm: string;
  lbmaSilverPmDate: string;
}

const RatesContext = createContext<RatesContextType | undefined>(undefined);

const TROY_OUNCE_TO_GRAMS = 31.1034768;

// MJDTA baseline rates (exact values from thejewellersassociation.org website)
const BASELINE_RATES = {
  g22k: 13200,
  g24k: 11020,
  silver: 240,
  platinum: 4900,
};

export function RatesProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState<MetalRate[]>(METAL_RATES);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());

  // Additional MJDTA specific states with initial MJDTA website data
  const [updateTime, setUpdateTime] = useState<string>('13/07/2026 Morning 09:34 AM');
  const [lbmaGoldAm, setLbmaGoldAm] = useState<string>('4070.95');
  const [lbmaGoldAmDate, setLbmaGoldAmDate] = useState<string>('13-07-2026 03:00:00 pm');
  const [lbmaGoldPm, setLbmaGoldPm] = useState<string>('4099.15');
  const [lbmaGoldPmDate, setLbmaGoldPmDate] = useState<string>('10-07-2026 07:30:00 pm');
  const [lbmaSilverAm, setLbmaSilverAm] = useState<string>('58.3900');
  const [lbmaSilverAmDate, setLbmaSilverAmDate] = useState<string>('13-07-2026 04:30:00 pm');
  const [lbmaSilverPm, setLbmaSilverPm] = useState<string>('-');
  const [lbmaSilverPmDate, setLbmaSilverPmDate] = useState<string>('');

  const fetchRates = async () => {
    try {
      setError(null);

      // Check database overrides first
      try {
        const dbRes = await fetch('/api-database.php?action=load_all');
        const dbJson = await dbRes.json();
        if (dbJson.success && dbJson.rates && dbJson.rates.length > 0) {
          const dbRates: MetalRate[] = dbJson.rates.map((r: any) => ({
            id: r.metal,
            name: r.name,
            ratePerGram: parseFloat(r.rate),
            change: r.change_val || '0.00',
            isUp: r.is_up === 1
          }));
          setRates(dbRates);
          setLastUpdated(new Date().toLocaleTimeString());
          setLoading(false);
          return; // Skip scraping if overrides are defined in the database
        }
      } catch (dbErr) {
        console.warn('Failed to load rates from database, falling back to live scraper.', dbErr);
      }

      // Attempt to scrape live rates from thejewellersassociation.org (MJDTA) via same-origin proxy route
      const mjdtaRes = await fetch('/api-mjdta.php');
      if (!mjdtaRes.ok) {
        throw new Error('Failed to fetch from MJDTA website');
      }

      const html = await mjdtaRes.text();

      // Regular expressions to extract MJDTA rates
      const gold22ctMatch = html.match(/#goldrate_22ct['"]\)\.html\(['"]([0-9.,]+)['"]\)/);
      const gold18ctMatch = html.match(/#goldrate_18ct['"]\)\.html\(['"]([0-9.,]+)['"]\)/);
      const silverMatch = html.match(/<span class=['"]silver_rate['"]>([0-9.,]+)<\/span>/);

      // Regular expressions to extract MJDTA rate changes/differences
      const gold22ctDiffMatch = html.match(/var goldrate_22ctdiff\s*=\s*['"]([+-]?[0-9.,]+)['"]/);
      const gold18ctDiffMatch = html.match(/var goldrate_18ctdiff\s*=\s*['"]([+-]?[0-9.,]+)['"]/);
      const silverDiffMatch = html.match(/var silverrate_1gmdiff\s*=\s*(?:parseFloat\()?\s*['"]([+-]?[0-9.,]+)['"]/);

      // Extract update time
      const updateTimeMatch = html.match(/#updatetime['"]\)\.html\(['"]([^'"]+)['"]\)/);
      if (updateTimeMatch && updateTimeMatch[1]) {
        setUpdateTime(updateTimeMatch[1]);
      }

      // Extract LBMA rates from table td cells
      const tdMatches = html.match(/<td class=["']london_rate1["'][^>]*>([\s\S]*?)<\/td>/g);
      if (tdMatches && tdMatches.length >= 4) {
        // Gold AM
        const m0 = tdMatches[0].match(/>([0-9.,-]+)<br><span[^>]*>\(([^)]+)\)/);
        if (m0) {
          setLbmaGoldAm(m0[1]);
          setLbmaGoldAmDate(m0[2]);
        }
        
        // Gold PM
        const m1 = tdMatches[1].match(/>([0-9.,-]+)<br><span[^>]*>\(([^)]+)\)/);
        if (m1) {
          setLbmaGoldPm(m1[1]);
          setLbmaGoldPmDate(m1[2]);
        }

        // Silver AM
        const m2 = tdMatches[2].match(/>([0-9.,-]+)<br><span[^>]*>\(([^)]+)\)/);
        if (m2) {
          setLbmaSilverAm(m2[1]);
          setLbmaSilverAmDate(m2[2]);
        }

        // Silver PM
        const m3 = tdMatches[3].match(/>([0-9.,-]+|-)(?:<br>?<span[^>]*>\(([^)]+)\))?/);
        if (m3) {
          setLbmaSilverPm(m3[1]);
          setLbmaSilverPmDate(m3[2] || '');
        }
      }

      let gold22kRate = BASELINE_RATES.g22k;
      let gold18kRate = BASELINE_RATES.g24k;
      let silverRate = BASELINE_RATES.silver;

      let g22kChangeVal = -100;
      let g18kChangeVal = -100;
      let silverChangeVal = 0.00;

      if (gold22ctMatch && gold22ctMatch[1]) {
        gold22kRate = parseFloat(gold22ctMatch[1].replace(/,/g, ''));
      }
      if (gold18ctMatch && gold18ctMatch[1]) {
        gold18kRate = parseFloat(gold18ctMatch[1].replace(/,/g, ''));
      }
      if (silverMatch && silverMatch[1]) {
        silverRate = parseFloat(silverMatch[1].replace(/,/g, ''));
      }

      if (gold22ctDiffMatch && gold22ctDiffMatch[1]) {
        g22kChangeVal = parseFloat(gold22ctDiffMatch[1]);
      }
      if (gold18ctDiffMatch && gold18ctDiffMatch[1]) {
        g18kChangeVal = parseFloat(gold18ctDiffMatch[1]);
      }
      if (silverDiffMatch && silverDiffMatch[1]) {
        silverChangeVal = parseFloat(silverDiffMatch[1]);
      }

      // Fetch dynamic Platinum rate in parallel (API supports CORS)
      let platinumRate = BASELINE_RATES.platinum;
      let platinumChangeVal = 0;
      try {
        const platRes = await fetch('https://api.gold-api.com/price/XPT/INR');
        if (platRes.ok) {
          const platData = await platRes.json();
          if (platData && platData.price) {
            platinumRate = Math.round(platData.price / TROY_OUNCE_TO_GRAMS);
            platinumChangeVal = platinumRate - BASELINE_RATES.platinum;
          }
        }
      } catch (platErr) {
        console.warn('Failed to fetch dynamic platinum rate:', platErr);
      }

      const updatedRates: MetalRate[] = [
        {
          id: 'g22k',
          name: '1 Gm Gold 22Kt',
          ratePerGram: gold22kRate,
          change: `${g22kChangeVal >= 0 ? '+' : ''}${g22kChangeVal}`,
          isUp: g22kChangeVal >= 0
        },
        {
          id: 'g24k',
          name: '1 Gm Gold 18Kt',
          ratePerGram: gold18kRate,
          change: `${g18kChangeVal >= 0 ? '+' : ''}${g18kChangeVal}`,
          isUp: g18kChangeVal >= 0
        },
        {
          id: 'silver',
          name: '1 Gm Silver',
          ratePerGram: silverRate,
          change: `${silverChangeVal >= 0 ? '+' : ''}${silverChangeVal.toFixed(2)}`,
          isUp: silverChangeVal >= 0
        },
        {
          id: 'platinum',
          name: 'Platinum (per gm)',
          ratePerGram: platinumRate,
          change: `${platinumChangeVal >= 0 ? '+' : ''}${platinumChangeVal}`,
          isUp: platinumChangeVal >= 0
        }
      ];

      setRates(updatedRates);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err: any) {
      console.warn('MJDTA Rates proxy fetch failed. Using exact MJDTA baseline rates as fallback.', err);
      
      // Fallback to exact MJDTA baseline rates (representing values from thejewellersassociation.org)
      const updatedRates: MetalRate[] = [
        {
          id: 'g22k',
          name: '1 Gm Gold 22Kt',
          ratePerGram: BASELINE_RATES.g22k,
          change: '-100',
          isUp: false
        },
        {
          id: 'g24k',
          name: '1 Gm Gold 18Kt',
          ratePerGram: BASELINE_RATES.g24k,
          change: '-100',
          isUp: false
        },
        {
          id: 'silver',
          name: '1 Gm Silver',
          ratePerGram: BASELINE_RATES.silver,
          change: '0.00',
          isUp: true
        },
        {
          id: 'platinum',
          name: 'Platinum (per gm)',
          ratePerGram: BASELINE_RATES.platinum,
          change: '0.00',
          isUp: true
        }
      ];
      setRates(updatedRates);
      setLastUpdated(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchRates();

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchRates();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <RatesContext.Provider value={{ 
      rates, loading, error, refreshRates: fetchRates, lastUpdated,
      updateTime, lbmaGoldAm, lbmaGoldAmDate, lbmaGoldPm, lbmaGoldPmDate,
      lbmaSilverAm, lbmaSilverAmDate, lbmaSilverPm, lbmaSilverPmDate
    }}>
      {children}
    </RatesContext.Provider>
  );
}

export function useRates() {
  const context = useContext(RatesContext);
  if (!context) {
    throw new Error('useRates must be used within a RatesProvider');
  }
  return context;
}
