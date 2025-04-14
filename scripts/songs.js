const ctSongs = [
    { 
        id: 0,
        title: "キス・ミー・パティシエ",
        shortName:"キスパティ",
        release: "2023/03/07",
        image: "https://img.youtube.com/vi/M8HGJfeq364/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=M8HGJfeq364"
    },
    { 
        id: 1,
        title: "hanamaru",
        shortName:"hanamaru", 
        release: "2023/03/07",
        image: "https://img.youtube.com/vi/FYzZdo3s1Ww/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=FYzZdo3s1Ww"
    },
    { 
        id: 2,
        title: "ナナイロプロローグ", 
        shortName:"ナナプロ",
        release: "2023/03/07",
        image: "https://img.youtube.com/vi/S46XHAe0AOY/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=S46XHAe0AOY"
    },
    { 
        id: 3,
        title: "未完な青春", 
        shortName:"未完な青春",
        release: "2023/03/07",
        image: "https://img.youtube.com/vi/VL12EaGgPGc/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=VL12EaGgPGc"
    }, 
    { 
        id: 4,
        title: "TUNE MY WAY", 
        shortName:"TUNE MY",
        release: "2023/04/07",
        image: "https://img.youtube.com/vi/xL20SFWuYeI/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=xL20SFWuYeI"
    },
    { 
        id: 5,
        title: "CATCH YOU", 
        shortName:"CATCH YOU",
        release: "2023/05/20",
        image: "https://img.youtube.com/vi/Tb3ussZ7uRc/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=Tb3ussZ7uRc"
    },
    { 
        id: 6,
        title: "きゅきゅきゅキュート", 
        shortName:"きゅきゅきゅ",
        release: "2023/06/27",
        image: "https://img.youtube.com/vi/q7ELOpcoXkE/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=q7ELOpcoXkE"
    },
    { 
        id: 7,
        title: "WAO！アオハル！",
        shortName:"ｗAOハル", 
        release: "2023/09/27",
        image: "https://img.youtube.com/vi/KBG59gtjHSQ/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=KBG59gtjHSQ"
    },
    { 
        id: 8,
        title: "Twilight Dilemma", 
        shortName:"Twilight",
        release: "2023/10/18",
        image: "https://img.youtube.com/vi/MGTQd58Vg3Y/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=MGTQd58Vg3Y"
    },
    { 
        id: 9,
        title: "必殺あざとポーズ", 
        shortName:"あざとポーズ",
        release: "2023/11/17",
        image: "https://img.youtube.com/vi/E0hvNxlKycI/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=E0hvNxlKycI"
    },
    { 
        id: 10,
        title: "備えあれば無問題", 
        shortName:"無問題",
        release: "2024/02/16",
        image: "https://img.youtube.com/vi/JSCsrCL3NGY/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=JSCsrCL3NGY"
    },
    { 
        id: 11,
        title: "言えなかったことば～ありがとう～", 
        shortName:"言えなかった",
        release: "2024/03/08",
        image: "https://img.youtube.com/vi/5q5gX06W9C0/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=5q5gX06W9C0"
    },
    { 
        id: 12,
        title: "倍倍FIGHT!", 
        shortName:"倍倍FIGHT!",
        release: "2024/04/24",
        image: "https://img.youtube.com/vi/9HKbo1FstOE/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=9HKbo1FstOE"
    },
    {
        id: 13,
        title: "レイドバックジャーニー", 
        shortName:"レイドバック",
        release: "2024/06/19",
        image: "https://img.youtube.com/vi/9HKbo1FstOE/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=9HKbo1FstOE"
    },
    { 
        id: 14,
        title: "エトセトLOVE YOU", 
        shortName:"エトセト",
        release: "2024/08/07",
        image: "https://img.youtube.com/vi/3qlNDiY1UtQ/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=3qlNDiY1UtQ"
    }, 
    { 
        id: 15,
        title: "君もゾンビですか ゾンビですね", 
        shortName:"ゾンビですか",
        release: "2024/10/18",
        image: "https://img.youtube.com/vi/Myh51E_5UTA/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=Myh51E_5UTA"
    },
    { 
        id: 16,
        title: "レベチかわいい！", 
        shortName:"レベチ",
        release: "2025/03/12",
        image: "https://img.youtube.com/vi/q0P115nbaks/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=q0P115nbaks"
    },
    { 
        id: 17,
        title: "絶対きゃんちゅー宣言！", 
        shortName:"絶きゃん",
        release: "2025/04/23",
        image: "https://img.youtube.com/vi/7-K5vb_cQiA/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=7-K5vb_cQiA"
    },
    { 
        id: 18,
        title: "推し♡好き♡しんどい", 
        shortName:"推し♡好き♡",
        release: "2025/04/23",
        image: "https://img.youtube.com/vi/7-K5vb_cQiA/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=7-K5vb_cQiA"
    }
];