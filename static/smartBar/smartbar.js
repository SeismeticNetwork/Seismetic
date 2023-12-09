function sidebar() {
    // Toggle the visibility of the dropdown menu
    var dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display = (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") ? "block" : "none";
  }
const Notifiable = true

  function SB_Notif(text) {
    const SmartBar = document.getElementById("tpbr")

    var ogwidth = SmartBar.style.width
    var ogborder = SmartBar.style.borderRadius
    var ogcolor = SmartBar.style.backgroundColor

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
          
          Notification_.remove()
          SmartBar.style.backgroundColor = ogcolor;
          SmartBar.style.width = ogwidth;
          SmartBar.style.borderRadius = ogborder;
          divsInsideSmartBar.forEach((div) => {
            div.style.display = 'flex';
          });
          const p_menu = document.getElementById('dropdownMenu')
          p_menu.style.display = 'none';
        }

    setTimeout(end, 5000);
  }


  function credits() {
    SB_Notif('Made by @rxfe.a on Insta')
  }
