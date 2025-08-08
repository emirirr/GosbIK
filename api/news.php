<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$mysqli = new mysqli("104.247.168.98", "gosbikco_2025", "Gosbik@2025", "gosbikco_2025");

if ($mysqli->connect_errno) {
    echo json_encode([
        'status' => 'error',
        'message' => 'MySQL bağlantı hatası: ' . $mysqli->connect_error
    ]);
    exit();
}


// API endpoint handling
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = $_GET['action'] ?? 'get_news';
    
    switch($action) {
        case 'get_news':
            getNews($mysqli);
            break;
        case 'get_news_by_category':
            $category = $_GET['category'] ?? '';
            getNewsByCategory($mysqli, $category);
            break;
        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}

function getNews($mysqli) {
    try {
        $query = "SELECT nl.*, nc.cat_name FROM news_list nl 
                  LEFT JOIN news_categories nc ON nl.cat_id = nc.id 
                  ORDER BY nl.id DESC LIMIT 10";
        $result = $mysqli->query($query);
        
        $news = [];
        while ($row = $result->fetch_assoc()) {
            $news[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'content' => $row['content'],
                'category' => $row['cat_name'],
                'image' => $row['poster'] ? "https://gosbik.com/upload/images/news/" . $row['poster'] : null,
                'date' => $row['created_at'] ?? date('Y-m-d'),
                'author' => $row['user_name'] ?? 'GosbIK Haber'
            ];
        }
        
        echo json_encode([
            'status' => 'success',
            'data' => $news
        ]);
    } catch(Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}

function getNewsByCategory($mysqli, $category) {
    try {
        $query = "SELECT nl.*, nc.cat_name FROM news_list nl 
                  LEFT JOIN news_categories nc ON nl.cat_id = nc.id 
                  WHERE nc.cat_name = ? 
                  ORDER BY nl.id DESC LIMIT 10";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("s", $category);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $news = [];
        while ($row = $result->fetch_assoc()) {
            $news[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'content' => $row['content'],
                'category' => $row['cat_name'],
                'image' => $row['poster'] ? "https://gosbik.com/upload/images/news/" . $row['poster'] : null,
                'date' => $row['created_at'] ?? date('Y-m-d'),
                'author' => $row['user_name'] ?? 'GosbIK Haber'
            ];
        }
        
        echo json_encode([
            'status' => 'success',
            'data' => $news
        ]);
    } catch(Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}



function makeSlug($string) {
    // Küçük harfe çevir
    $string = mb_strtolower($string, 'UTF-8');

    // Türkçe karakterleri dönüştür
    $turkce = ['ç','ğ','ı','ö','ş','ü'];
    $duzgun = ['c','g','i','o','s','u'];
    $string = str_replace($turkce, $duzgun, $string);

    // Harf, rakam ve tire dışındaki karakterleri sil
    $string = preg_replace('/[^a-z0-9\s-]/', '', $string);

    // Boşlukları tireye çevir
    $string = preg_replace('/[\s]+/', '-', $string);

    // Çift tireleri teke düşür
    $string = preg_replace('/-+/', '-', $string);

    // Baş ve sondaki tireleri sil
    $string = trim($string, '-');

    return $string;
}

function anahtarKelimeleriOlustur($metin, $maksimum = 5) {
    // Küçük harfe çevir
    $metin = mb_strtolower($metin, 'UTF-8');

    // Türkçe karakterleri düzelt
    $tr = ['ç','ğ','ı','ö','ş','ü'];
    $duz = ['c','g','i','o','s','u'];
    $metin = str_replace($tr, $duz, $metin);

    // Noktalama işaretlerini sil
    $metin = preg_replace('/[^\p{L}\p{N}\s]/u', '', $metin);

    // Kelimelere ayır
    $kelimeler = explode(" ", $metin);

    // Stop words
    $stopWords = ['ve', 'veya', 'ile', 'için', 'gibi', 'olan', 'olarak', 'bu', 'bir', 'artık', 'de', 'da', 'ki', 'şu', 'herkesin', 'aldı', 'kararı', 'yıl', 'sonra', 'içeriği', 'yerine', 'tükettiği', 'kullanacak', 'olan'];

    $frekanslar = [];

    foreach ($kelimeler as $kelime) {
        $kelime = trim($kelime);
        if (strlen($kelime) > 3 && !in_array($kelime, $stopWords)) {
            if (!isset($frekanslar[$kelime])) {
                $frekanslar[$kelime] = 1;
            } else {
                $frekanslar[$kelime]++;
            }
        }
    }

    // Frekansa göre sırala (yüksekten düşüğe)
    arsort($frekanslar);

    // En çok geçen ilk $maksimum kelimeyi al
    $anahtarlar = array_slice(array_keys($frekanslar), 0, $maksimum);

    return implode(", ", $anahtarlar);
}


$stmt->close();
$mysqli->close();
?>