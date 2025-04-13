// クエリパラメータからデータを取得
const params = new URLSearchParams(window.location.search);
const compressedData = params.get('data');

if (compressedData) {
    try {
        // データを解凍してJSONに変換
        const jsonData = JSON.parse(LZString.decompressFromEncodedURIComponent(compressedData));

        // タイトルを設定
        document.getElementById('setlist-header').textContent = jsonData.title || 'セットリスト';

        // 楽曲リストを表示
        const setlistContainer = document.getElementById('setlist-container');
        jsonData.songs.forEach(index => {
            const song = ctSongs[index - 1]; // インデックスは1始まり
            if (song) {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <a href="${song.link}" target="_blank">
                        <img src="${song.image}" alt="${song.title}">
                    </a>
                    <span>${song.title}</span>
                `;
                setlistContainer.appendChild(card);
            }
        });
    } catch (error) {
        console.error('データの解凍または解析に失敗しました:', error);
    }
} else {
    console.error('クエリパラメータにデータが含まれていません。');
}