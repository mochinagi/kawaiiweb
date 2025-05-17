// 显示加载动画
function showLoader() {
    document.getElementById("bunnyLoader").style.display = "flex";
}

// 隐藏加载动画
function hideLoader() {
    document.getElementById("bunnyLoader").style.display = "none";
}

// 页面加载完成后隐藏加载动画
window.addEventListener('load', () => {
    hideLoader();
});


// 添加 ToDo
function addTodo() {
    const input = document.getElementById("todoInput");
    if (!input.value.trim()) return;
    const li = document.createElement("li");
    li.textContent = input.value;
    document.getElementById("todoList").appendChild(li);
    input.value = "";
}

// 添加 Note
function addNote() {
    const noteInput = document.getElementById("noteInput");
    if (!noteInput.value.trim()) return;
    const li = document.createElement("li");
    li.textContent = noteInput.value;
    document.getElementById("noteList").appendChild(li);
    noteInput.value = "";
}

// にっこり计数
let smileCount = 0;
function addSmile() {
    smileCount++;
    document.getElementById("smileCount").textContent = smileCount;
}

// 每日一句 - 激励兔兔语
const messages = [
    "今日もえらいね！🐰",
    "きみならできるよ！🌟",
    "ちょっとずつ進もうね！",
    "休むことも大事だよ🌸",
    "うさちゃんはいつでも味方だよ！💖",
    "にっこりして、元気出して✨",
    "今日も生きててえらい！",
    "深呼吸してみよう〜🍃"
];
const todayMsg = messages[Math.floor(Math.random() * messages.length)];
document.getElementById("dailyMessage").textContent = todayMsg;


// 会动的猫猫
const cat = document.querySelector('.cat-animation');
const frameWidth = 32;
const totalFrames = 10;
let currentFrame = 0;

setInterval(() => {
    const offsetX = -frameWidth * currentFrame;
    cat.style.backgroundPosition = `${offsetX}px 0`;
    currentFrame = (currentFrame + 1) % totalFrames;
}, 150); // 每帧间隔时间（毫秒）



// 根据天气代码和昼夜判断返回对应emoji
function getWeatherEmoji(code, isDay) {
    if (code === 0) return isDay ? "☀️" : "🌙";
    if (code >= 1 && code <= 3) return "⛅";
    if (code === 45 || code === 48) return "🌫️";
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 95) return "⛈️";
    return "❓";
}

// 根据天气代码返回日语描述
function weatherCodeToDesc(code) {
    const descMap = {
        0: "晴れ",
        1: "主に晴れ",
        2: "一部曇り",
        3: "曇り",
        45: "霧",
        48: "霧氷",
        51: "小雨",
        53: "中雨",
        55: "大雨",
        56: "凍雨",
        57: "大凍雨",
        61: "弱い雨",
        63: "中雨",
        65: "強い雨",
        66: "弱い凍雨",
        67: "強い凍雨",
        71: "弱い雪",
        73: "中雪",
        75: "強い雪",
        77: "雪の粒",
        80: "弱いシャワー",
        81: "中シャワー",
        82: "強いシャワー",
        95: "雷雨",
        96: "軽い雷雨",
        99: "強い雷雨",
    };
    return descMap[code] || "不明な天気";
}

// 请求东京天气并更新页面
async function fetchTokyoWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=35.682839&longitude=139.759455&current_weather=true&timezone=Asia%2FTokyo";

    try {
        const response = await fetch(url);
        const data = await response.json();

        const current = data.current_weather;
        const temperature = current.temperature;
        const weatherCode = current.weathercode;
        const isDay = current.is_day === 1;

        document.getElementById("weatherEmoji").textContent = getWeatherEmoji(weatherCode, isDay);
        document.getElementById("tempText").textContent = `${temperature}°C`;
        document.getElementById("weatherDesc").textContent = weatherCodeToDesc(weatherCode);

    } catch (error) {
        console.error("天気取得失敗:", error);
        document.getElementById("weatherEmoji").textContent = "❓";
        document.getElementById("tempText").textContent = "--";
        document.getElementById("weatherDesc").textContent = "取得できません";
    }
}

// 页面加载后自动调用
window.onload = function () {
    fetchTokyoWeather();
};


// 你可以在这里加生日倒计时、像素兔兔动效、保存功能等
