document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.getElementById('popup-container');
    const agreeBtn = document.getElementById('agree-btn');
    const disagreeBtn = document.getElementById('disagree-btn');

    // Check if the user has agreed in the last 15 minutes
    const hasAgreedRecently = localStorage.getItem('agreedTimestamp');
    const currentTime = new Date().getTime();

    if (!hasAgreedRecently || (currentTime - hasAgreedRecently > 15 * 60 * 1000)) {
        // Show the popup if the user hasn't agreed in the last 15 minutes
        popupContainer.style.display = 'flex';
    }

    // Handle Agree button click
    agreeBtn.addEventListener('click', function () {
        // Close the popup
        popupContainer.style.display = 'none';

        // Save the current timestamp to localStorage
        localStorage.setItem('agreedTimestamp', currentTime);
    });

    // Handle Disagree button click
    disagreeBtn.addEventListener('click', function () {
        // Redirect to the homepage or any other page
        window.location.href = 'https://www.google.com/maps/place/Chandigarh+Arbitration+Consultants/@30.696343,76.713463,19z/data=!4m6!3m5!1s0x390feff82ed3593b:0xd2a021ae84f84680!8m2!3d30.6963425!4d76.7134631!16s%2Fg%2F11lcljc3kv?hl=en&entry=ttu';
    });
});
