<?php
// Secure headers & CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Session management
session_start();

// Database folder and file paths
$dbFolder = __DIR__ . '/database';
$dbFile = $dbFolder . '/oms_store.sqlite';
$uploadsFolder = __DIR__ . '/uploads';

// Ensure directories exist with proper permissions
if (!file_exists($dbFolder)) {
    mkdir($dbFolder, 0755, true);
    // Write .htaccess to block direct download of the SQLite database
    file_put_contents($dbFolder . '/.htaccess', "Deny from all\n");
}
if (!file_exists($uploadsFolder)) {
    mkdir($uploadsFolder, 0755, true);
}

// Establish SQLite Database Connection
try {
    $db = new PDO("sqlite:" . $dbFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

// Initialise Database Tables if they do not exist
try {
    $db->exec("CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_id INTEGER DEFAULT NULL,
        slug TEXT UNIQUE NOT NULL,
        name_en TEXT NOT NULL,
        name_ta TEXT,
        name_hi,
        name_te TEXT,
        icon TEXT DEFAULT 'Sparkles',
        section_group TEXT DEFAULT 'jewellery',
        sort_order INTEGER DEFAULT 0,
        navbar_tab TEXT DEFAULT 'all'
    )");

    try {
        @$db->exec("ALTER TABLE categories ADD COLUMN navbar_tab TEXT DEFAULT 'all'");
    } catch (PDOException $e) {
        // ignore
    }

    $db->exec("CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        title_en TEXT NOT NULL,
        title_ta TEXT,
        title_hi TEXT,
        title_te TEXT,
        description_en TEXT,
        description_ta TEXT,
        description_hi TEXT,
        description_te TEXT,
        weight REAL DEFAULT 0.0,
        making_charges REAL DEFAULT 0.0,
        waste_charges REAL DEFAULT 0.0,
        image_url TEXT,
        is_featured INTEGER DEFAULT 0,
        is_new_arrival INTEGER DEFAULT 0,
        metal_type TEXT DEFAULT 'gold',
        purity TEXT DEFAULT '22K',
        sku TEXT,
        gender TEXT DEFAULT 'Unisex',
        occasion TEXT DEFAULT 'Casual Wear',
        price_formula TEXT DEFAULT NULL
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS carousel_banners (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title_en TEXT,
        title_ta TEXT,
        title_hi TEXT,
        title_te TEXT,
        subtitle_en TEXT,
        subtitle_ta TEXT,
        subtitle_hi TEXT,
        subtitle_te TEXT,
        media_type TEXT DEFAULT 'image',
        image_url TEXT,
        video_url TEXT,
        link_url TEXT,
        sort_order INTEGER DEFAULT 0
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS rates (
        metal TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        rate REAL NOT NULL,
        change_val TEXT,
        is_up INTEGER DEFAULT 1
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS settings (
        key_name TEXT PRIMARY KEY,
        value_val TEXT
    )");
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Table initialisation failed: " . $e->getMessage()]);
    exit();
}

// Seed Initial Data if Database is completely empty
$settingsCount = $db->query("SELECT COUNT(*) FROM settings")->fetchColumn();
if ($settingsCount == 0) {
    try {
        $db->beginTransaction();

        // 1. Seed Settings
        $settingsToSeed = [
            'admin_password' => password_hash('admin123', PASSWORD_DEFAULT),
            'session_token' => '',
            'notice_text_en' => '★ OM SAKTHI JEWELLERY ROYAL CLUB OFFER ★ Welcome! Register a secure DigiGold or Super Gold savings scheme today to secure making charges at FLAT 0% up to 18% on all wedding ornaments. Tap help to consult.',
            'notice_text_ta' => '★ ஓம் சக்தி ஜூவல்லரி ராயல் கிளப் சலுகை ★ வணக்கம்! திருமண நகைகளின் செய்கூலி மற்றும் சேதாரத்தை 0% முதல் 18% வரை சேமிக்க, இன்றே எங்களின் பாதுகாப்பான டிஜிகோல்டு அல்லது சூப்பர் கோல்டு திட்டத்தில் பதிவு செய்யுங்கள்.',
            'notice_text_hi' => '★ ओम शक्ति ज्वेलरी रॉयल क्लब ऑफर ★ नमस्ते! सभी विवाह आभूषणों पर मेकिंग चार्ज को 0% से 18% तक सुरक्षित रखने के लिए आज ही डिजीगोल्ड या सुपर गोल्ड बचत योजना में पंजीकरण करें।',
            'notice_text_te' => '★ ఓం శక్తి జ్యువెలరీ రాయల్ క్లబ్ ఆఫర్ ★ నమస్కారం! పెళ్లి ఆభరణాలపై తరుగు, మజూరీ ఛార్జీలను 0% నుండి 18% వరకు ఆదా చేయడానికి ఈరోజే మా సురక్షిత డిజిగోల్డ్ లేదా సూపర్ గోల్డ్ సేవింగ్స్ స్కీమ్‌లో నమోదు చేసుకోండి.'
        ];
        
        $setStmt = $db->prepare("INSERT OR REPLACE INTO settings (key_name, value_val) VALUES (:key, :val)");
        foreach ($settingsToSeed as $k => $v) {
            $setStmt->execute([':key' => $k, ':val' => $v]);
        }

        // 2. Seed Metal Rates
        $ratesToSeed = [
            ['metal' => 'g22k', 'name' => '1 Gm Gold 22Kt', 'rate' => 13200, 'change' => '-100', 'is_up' => 0],
            ['metal' => 'g18k', 'name' => '1 Gm Gold 18Kt', 'rate' => 11020, 'change' => '-100', 'is_up' => 0],
            ['metal' => 'silver', 'name' => '1 Gm Silver', 'rate' => 240, 'change' => '0.00', 'is_up' => 1],
            ['metal' => 'platinum', 'name' => 'Platinum (per gm)', 'rate' => 4900, 'change' => '0.00', 'is_up' => 1],
        ];
        $rateStmt = $db->prepare("INSERT OR REPLACE INTO rates (metal, name, rate, change_val, is_up) VALUES (:metal, :name, :rate, :change, :is_up)");
        foreach ($ratesToSeed as $r) {
            $rateStmt->execute([
                ':metal' => $r['metal'],
                ':name' => $r['name'],
                ':rate' => $r['rate'],
                ':change' => $r['change'],
                ':is_up' => $r['is_up']
            ]);
        }

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(["success" => false, "message" => "Database seeding failed: " . $e->getMessage()]);
        exit();
    }
}

// Verification helper function
function verifyAuth($db) {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    if (empty($authHeader) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    
    if (empty($authHeader)) {
        return false;
    }
    
    // Extract token
    $token = trim(str_replace('Bearer', '', $authHeader));
    
    // Validate token against database settings
    $stmt = $db->prepare("SELECT value_val FROM settings WHERE key_name = 'session_token'");
    $stmt->execute();
    $savedToken = $stmt->fetchColumn();
    
    return (!empty($savedToken) && $savedToken === $token);
}

// Router actions
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'load_all':
        // Load categories
        $categories = $db->query("SELECT * FROM categories ORDER BY sort_order ASC, name_en ASC")->fetchAll();
        
        // Load products
        $products = $db->query("SELECT * FROM products ORDER BY id DESC")->fetchAll();
        
        // Load rates
        $rates = $db->query("SELECT * FROM rates")->fetchAll();
        
        // Load banners
        $banners = $db->query("SELECT * FROM carousel_banners ORDER BY sort_order ASC")->fetchAll();
        
        // Load settings
        $settingsRows = $db->query("SELECT key_name, value_val FROM settings WHERE key_name != 'admin_password'")->fetchAll();
        $settings = [];
        foreach ($settingsRows as $row) {
            $settings[$row['key_name']] = $row['value_val'];
        }
        
        echo json_encode([
            "success" => true,
            "categories" => $categories,
            "products" => $products,
            "rates" => $rates,
            "banners" => $banners,
            "settings" => $settings
        ]);
        break;

    case 'login':
        $data = json_decode(file_get_contents('php://input'), true);
        $password = isset($data['password']) ? $data['password'] : '';
        
        // Fetch current password hash
        $stmt = $db->prepare("SELECT value_val FROM settings WHERE key_name = 'admin_password'");
        $stmt->execute();
        $hash = $stmt->fetchColumn();
        
        if (password_verify($password, $hash)) {
            // Generate a secure session token
            $token = bin2hex(random_bytes(32));
            
            // Save token
            $upStmt = $db->prepare("UPDATE settings SET value_val = :token WHERE key_name = 'session_token'");
            $upStmt->execute([':token' => $token]);
            
            echo json_encode(["success" => true, "token" => $token]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect admin password"]);
        }
        break;

    case 'save_product':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        
        if ($id > 0) {
            // Update product
            $stmt = $db->prepare("UPDATE products SET 
                category_id = :category_id,
                title_en = :title_en, title_ta = :title_ta, title_hi = :title_hi, title_te = :title_te,
                description_en = :description_en, description_ta = :description_ta, description_hi = :description_hi, description_te = :description_te,
                weight = :weight, making_charges = :making_charges, waste_charges = :waste_charges,
                image_url = :image_url, is_featured = :is_featured, is_new_arrival = :is_new_arrival,
                metal_type = :metal_type, purity = :purity, sku = :sku, gender = :gender, occasion = :occasion,
                price_formula = :price_formula WHERE id = :id");
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        } else {
            // Insert product
            $stmt = $db->prepare("INSERT INTO products (
                category_id, title_en, title_ta, title_hi, title_te,
                description_en, description_ta, description_hi, description_te,
                weight, making_charges, waste_charges, image_url, is_featured, is_new_arrival,
                metal_type, purity, sku, gender, occasion, price_formula
            ) VALUES (
                :category_id, :title_en, :title_ta, :title_hi, :title_te,
                :description_en, :description_ta, :description_hi, :description_te,
                :weight, :making_charges, :waste_charges, :image_url, :is_featured, :is_new_arrival,
                :metal_type, :purity, :sku, :gender, :occasion, :price_formula
            )");
        }
        
        $stmt->bindValue(':category_id', (int)$data['category_id'], PDO::PARAM_INT);
        $stmt->bindValue(':title_en', $data['title_en'], PDO::PARAM_STR);
        $stmt->bindValue(':title_ta', $data['title_ta'], PDO::PARAM_STR);
        $stmt->bindValue(':title_hi', $data['title_hi'], PDO::PARAM_STR);
        $stmt->bindValue(':title_te', $data['title_te'], PDO::PARAM_STR);
        $stmt->bindValue(':description_en', $data['description_en'], PDO::PARAM_STR);
        $stmt->bindValue(':description_ta', $data['description_ta'], PDO::PARAM_STR);
        $stmt->bindValue(':description_hi', $data['description_hi'], PDO::PARAM_STR);
        $stmt->bindValue(':description_te', $data['description_te'], PDO::PARAM_STR);
        $stmt->bindValue(':weight', (float)$data['weight'], PDO::PARAM_STR);
        $stmt->bindValue(':making_charges', (float)$data['making_charges'], PDO::PARAM_STR);
        $stmt->bindValue(':waste_charges', (float)$data['waste_charges'], PDO::PARAM_STR);
        $stmt->bindValue(':image_url', $data['image_url'], PDO::PARAM_STR);
        $stmt->bindValue(':is_featured', (int)$data['is_featured'], PDO::PARAM_INT);
        $stmt->bindValue(':is_new_arrival', (int)$data['is_new_arrival'], PDO::PARAM_INT);
        $stmt->bindValue(':metal_type', $data['metal_type'], PDO::PARAM_STR);
        $stmt->bindValue(':purity', $data['purity'], PDO::PARAM_STR);
        $stmt->bindValue(':sku', $data['sku'], PDO::PARAM_STR);
        $stmt->bindValue(':gender', $data['gender'], PDO::PARAM_STR);
        $stmt->bindValue(':occasion', $data['occasion'], PDO::PARAM_STR);
        $stmt->bindValue(':price_formula', isset($data['price_formula']) ? $data['price_formula'] : null, PDO::PARAM_STR);
        
        $stmt->execute();
        echo json_encode(["success" => true, "productId" => $id > 0 ? $id : $db->lastInsertId()]);
        break;

    case 'delete_product':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        
        $stmt = $db->prepare("DELETE FROM products WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(["success" => true]);
        break;

    case 'save_category':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        
        if ($id > 0) {
            $stmt = $db->prepare("UPDATE categories SET 
                parent_id = :parent_id,
                slug = :slug,
                name_en = :name_en, name_ta = :name_ta, name_hi = :name_hi, name_te = :name_te,
                icon = :icon, section_group = :section_group, sort_order = :sort_order, navbar_tab = :navbar_tab WHERE id = :id");
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $db->prepare("INSERT INTO categories (parent_id, slug, name_en, name_ta, name_hi, name_te, icon, section_group, sort_order, navbar_tab) VALUES (:parent_id, :slug, :name_en, :name_ta, :name_hi, :name_te, :icon, :section_group, :sort_order, :navbar_tab)");
        }
        
        $stmt->bindValue(':parent_id', empty($data['parent_id']) ? null : (int)$data['parent_id'], PDO::PARAM_INT);
        $stmt->bindValue(':slug', $data['slug'], PDO::PARAM_STR);
        $stmt->bindValue(':name_en', $data['name_en'], PDO::PARAM_STR);
        $stmt->bindValue(':name_ta', $data['name_ta'], PDO::PARAM_STR);
        $stmt->bindValue(':name_hi', $data['name_hi'], PDO::PARAM_STR);
        $stmt->bindValue(':name_te', $data['name_te'], PDO::PARAM_STR);
        $stmt->bindValue(':icon', $data['icon'], PDO::PARAM_STR);
        $stmt->bindValue(':section_group', $data['section_group'], PDO::PARAM_STR);
        $stmt->bindValue(':sort_order', (int)$data['sort_order'], PDO::PARAM_INT);
        $stmt->bindValue(':navbar_tab', empty($data['navbar_tab']) ? 'all' : $data['navbar_tab'], PDO::PARAM_STR);
        
        $stmt->execute();
        echo json_encode(["success" => true, "categoryId" => $id > 0 ? $id : $db->lastInsertId()]);
        break;

    case 'delete_category':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        
        // Unbind any subcategories
        $db->prepare("UPDATE categories SET parent_id = NULL WHERE parent_id = :id")->execute([':id' => $id]);
        
        $stmt = $db->prepare("DELETE FROM categories WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(["success" => true]);
        break;

    case 'save_setting':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $key = isset($data['key']) ? $data['key'] : '';
        $value = isset($data['value']) ? $data['value'] : '';
        
        if ($key === 'admin_password') {
            // Hash the password
            $value = password_hash($value, PASSWORD_DEFAULT);
        }
        
        $stmt = $db->prepare("INSERT OR REPLACE INTO settings (key_name, value_val) VALUES (:key, :val)");
        $stmt->execute([':key' => $key, ':val' => $value]);
        echo json_encode(["success" => true]);
        break;

    case 'save_banner':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        
        if ($id > 0) {
            $stmt = $db->prepare("UPDATE carousel_banners SET 
                title_en = :title_en, title_ta = :title_ta, title_hi = :title_hi, title_te = :title_te,
                subtitle_en = :subtitle_en, subtitle_ta = :subtitle_ta, subtitle_hi = :subtitle_hi, subtitle_te = :subtitle_te,
                media_type = :media_type, image_url = :image_url, video_url = :video_url, link_url = :link_url,
                sort_order = :sort_order WHERE id = :id");
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $db->prepare("INSERT INTO carousel_banners (
                title_en, title_ta, title_hi, title_te,
                subtitle_en, subtitle_ta, subtitle_hi, subtitle_te,
                media_type, image_url, video_url, link_url, sort_order
            ) VALUES (
                :title_en, :title_ta, :title_hi, :title_te,
                :subtitle_en, :subtitle_ta, :subtitle_hi, :subtitle_te,
                :media_type, :image_url, :video_url, :link_url, :sort_order
            )");
        }
        
        $stmt->bindValue(':title_en', $data['title_en'], PDO::PARAM_STR);
        $stmt->bindValue(':title_ta', $data['title_ta'], PDO::PARAM_STR);
        $stmt->bindValue(':title_hi', $data['title_hi'], PDO::PARAM_STR);
        $stmt->bindValue(':title_te', $data['title_te'], PDO::PARAM_STR);
        $stmt->bindValue(':subtitle_en', $data['subtitle_en'], PDO::PARAM_STR);
        $stmt->bindValue(':subtitle_ta', $data['subtitle_ta'], PDO::PARAM_STR);
        $stmt->bindValue(':subtitle_hi', $data['subtitle_hi'], PDO::PARAM_STR);
        $stmt->bindValue(':subtitle_te', $data['subtitle_te'], PDO::PARAM_STR);
        $stmt->bindValue(':media_type', $data['media_type'], PDO::PARAM_STR);
        $stmt->bindValue(':image_url', $data['image_url'], PDO::PARAM_STR);
        $stmt->bindValue(':video_url', $data['video_url'], PDO::PARAM_STR);
        $stmt->bindValue(':link_url', $data['link_url'], PDO::PARAM_STR);
        $stmt->bindValue(':sort_order', (int)$data['sort_order'], PDO::PARAM_INT);
        
        $stmt->execute();
        echo json_encode(["success" => true, "bannerId" => $id > 0 ? $id : $db->lastInsertId()]);
        break;

    case 'delete_banner':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : 0;
        
        $stmt = $db->prepare("DELETE FROM carousel_banners WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(["success" => true]);
        break;

    case 'save_rates':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $db->prepare("INSERT OR REPLACE INTO rates (metal, name, rate, change_val, is_up) VALUES (:metal, :name, :rate, :change, :is_up)");
        foreach ($data['rates'] as $r) {
            $stmt->execute([
                ':metal' => $r['metal'],
                ':name' => $r['name'],
                ':rate' => (float)$r['rate'],
                ':change' => $r['change'],
                ':is_up' => (int)$r['is_up']
            ]);
        }
        echo json_encode(["success" => true]);
        break;

    case 'upload_file':
        if (!verifyAuth($db)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            break;
        }
        
        if (!isset($_FILES['file'])) {
            echo json_encode(["success" => false, "message" => "No file uploaded"]);
            break;
        }
        
        $file = $_FILES['file'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm'];
        
        if (!in_array(strtolower($ext), $allowedExtensions)) {
            echo json_encode(["success" => false, "message" => "Disallowed file type: " . $ext]);
            break;
        }
        
        // Generate random unique name
        $name = bin2hex(random_bytes(16)) . '.' . $ext;
        $targetPath = $uploadsFolder . '/' . $name;
        
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            $webUrl = '/uploads/' . $name;
            echo json_encode(["success" => true, "url" => $webUrl]);
        } else {
            echo json_encode(["success" => false, "message" => "File upload failed"]);
        }
        break;

    default:
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Unknown action"]);
        break;
}
?>
