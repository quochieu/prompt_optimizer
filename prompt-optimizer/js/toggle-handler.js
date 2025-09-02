// Modern toggle handler for Tailwind CSS switches
class ToggleHandler {
  constructor() {
    this.init();
  }

  init() {
    // Handle all toggle switches
    document.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox' && e.target.closest('.toggle-group')) {
        this.handleToggleChange(e.target);
      }
    });

    // Initialize toggle states on page load
    this.initializeToggles();
  }

  handleToggleChange(checkbox) {
    const toggleGroup = checkbox.closest('.toggle-group');
    const thumb = toggleGroup.querySelector('.toggle-thumb');
    const switchElement = toggleGroup.querySelector('.toggle-switch');

    if (checkbox.checked) {
      toggleGroup.classList.add('checked');
      thumb.classList.add('checked');
      switchElement.classList.add('checked');
    } else {
      toggleGroup.classList.remove('checked');
      thumb.classList.remove('checked');
      switchElement.classList.remove('checked');
    }
  }

  initializeToggles() {
    const checkboxes = document.querySelectorAll('.toggle-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      this.handleToggleChange(checkbox);
    });
  }

  // Utility method to get toggle state
  getToggleState(toggleId) {
    const toggle = document.getElementById(toggleId);
    return toggle ? toggle.checked : false;
  }

  // Utility method to set toggle state
  setToggleState(toggleId, checked) {
    const toggle = document.getElementById(toggleId);
    if (toggle) {
      toggle.checked = checked;
      this.handleToggleChange(toggle);
    }
  }
}

// Initialize toggle handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.toggleHandler = new ToggleHandler();
});