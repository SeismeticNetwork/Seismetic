function sidebar() {
    // Toggle the visibility of the dropdown menu
    var dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display = (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") ? "block" : "none";
  }
const Notifiable = true

  function SB_Notif(text) {
    const SmartBar = document.getElementById("tpbr")
    const divsInsideSmartBar = SmartBar.querySelectorAll('div');
    if (SmartBar) {
      divsInsideSmartBar.forEach((div) => {
        div.style.display = 'none';
      });
    }
    
        SmartBar.style.width = '500px';
        SmartBar.style.borderRadius = '90px';
        SmartBar.style.backgroundColor = '#000';
        var Notification_ = document.createElement('p');
        SmartBar.appendChild(Notification_);
        Notification_.textContent = text;
        Notification_.style.fontFamily = 'sans-serif';
        Notification_.style.fontSize = '24px';
        Notification_.style.textAlign = 'center';
        Notification_.style.marginLeft = 'auto';
        Notification_.style.marginRight = 'auto';
        function end() {
          divsInsideSmartBar.forEach((div) => {
            div.style.display = 'flex';
          });
          Notification_.remove()
          SmartBar.style.backgroundColor = '#161515ff';
          SmartBar.style.width = '630px';
          SmartBar.style.borderRadius = '15px';
          const p_menu = document.getElementById('dropdownMenu')
          p_menu.style.display = 'none';
        }

    setTimeout(end, 5000);
  }


  function credits() {
    SB_Notif('Made by @rxfe.a on Insta')
  }