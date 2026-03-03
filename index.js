const fs = require('fs');

const talks = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const styles = fs.readFileSync('public/styles.css', 'utf-8');
const script = fs.readFileSync('public/script.js', 'utf-8');

let scheduleHtml = '';
let currentTime = new Date();
currentTime.setHours(10, 0, 0, 0); 

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

talks.forEach((talk, index) => {
    if (index === 3) {
        // Lunch break after the 3rd talk
        const breakStartTime = new Date(currentTime);
        currentTime.setHours(currentTime.getHours() + 1);
        const breakEndTime = new Date(currentTime);
        scheduleHtml += `
            <li class="schedule-item break">
                <div class="time">${formatTime(breakStartTime)} - ${formatTime(breakEndTime)}</div>
                <h3>Lunch Break</h3>
            </li>
        `;
    }

    const startTime = new Date(currentTime);
    currentTime.setHours(currentTime.getHours() + 1);
    const endTime = new Date(currentTime);

    scheduleHtml += `
        <li class="schedule-item" data-categories="${talk.categories.join(', ')}">
            <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
            <h3>${talk.title}</h3>
            <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
            <p>${talk.description}</p>
            <p class="categories">Categories: ${talk.categories.join(', ')}</p>
        </li>
    `;
    
    if (index < talks.length - 1) {
        currentTime.setMinutes(currentTime.getMinutes() + 10);
    }
});


const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talks Today</title>
    <style>${styles}</style>
</head>
<body>
    <div class="container">
        <h1>Tech Talks Today</h1>
        <h2>Event Schedule</h2>
        <input type="text" id="search" placeholder="Search by category...">
        <ul class="schedule">
            ${scheduleHtml}
        </ul>
    </div>
    <script>${script}<\/script>
</body>
</html>
`;

fs.writeFileSync('public/index.html', finalHtml);

console.log('Website generated successfully in public/index.html');
