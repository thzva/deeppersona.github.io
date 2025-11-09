// Profile Loader for Multiple Countries
let profileData = [];
let currentCaseNum = 1;
let currentCountry = null;

// Load profile data from JSON file based on country
async function loadProfileData(country) {
  try {
    const fileMap = {
      'china': 'chn.json',
      'usa': 'usa.json',
      'japan': 'jpn.json',
      'germany': 'deu.json',
      'india': 'ind.json',
      'kenya': 'ken.json',
      'argentina': 'arg.json'
    };
    const countryNameMap = {
      'china': 'China',
      'usa': 'USA',
      'japan': 'Japan',
      'germany': 'Germany',
      'india': 'India',
      'kenya': 'Kenya',
      'argentina': 'Argentina'
    };
    
    const fileName = fileMap[country];
    const countryName = countryNameMap[country];
    
    console.log(`Attempting to load profile data from ./profile/${fileName}`);
    const response = await fetch(`./profile/${fileName}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('Raw response received, length:', text.length);
    
    profileData = JSON.parse(text);
    console.log('Profile data loaded successfully:', profileData.length, 'cases');
    console.log('First case preview:', profileData[0].Summary.substring(0, 100) + '...');
    
    currentCountry = country;
    
    // Display first case by default
    displayCase(1, countryName);
  } catch (error) {
    console.error('Error loading profile data:', error);
    document.getElementById('case-content').innerHTML = 
      `<p style="text-align: center; color: #e74c3c;">Error loading profile data: ${error.message}<br>Please check the browser console for details.</p>`;
  }
}

// Display case content
function displayCase(caseNum, countryName) {
  currentCaseNum = caseNum;
  const caseIndex = caseNum - 1;
  
  if (profileData && profileData[caseIndex]) {
    const summary = profileData[caseIndex].Summary;
    
    // Update title
    const countryNameMap = {
      'china': 'China',
      'usa': 'USA',
      'japan': 'Japan',
      'germany': 'Germany',
      'india': 'India',
      'kenya': 'Kenya',
      'argentina': 'Argentina'
    };
    const displayCountry = countryName || countryNameMap[currentCountry] || 'Profile';
    document.getElementById('case-title').textContent = `${displayCountry} Profile ${caseNum}`;
    
    // Update content with formatted paragraphs
    const paragraphs = summary.split('\n\n');
    let htmlContent = '';
    paragraphs.forEach(para => {
      if (para.trim()) {
        htmlContent += `<p style="margin-bottom: 0.6rem; text-indent: 2em;">${para.trim()}</p>`;
      }
    });
    
    document.getElementById('case-content').innerHTML = htmlContent;
    
    // Update button states
    updateButtonStates(caseNum);
  } else {
    document.getElementById('case-content').innerHTML = 
      '<p style="text-align: center; color: #666;">Case data not found.</p>';
  }
}

// Update button active states
function updateButtonStates(activeCaseNum) {
  const buttons = document.querySelectorAll('.question-case-btn');
  buttons.forEach(btn => {
    const btnCaseNum = parseInt(btn.getAttribute('data-case-num'));
    if (btnCaseNum === activeCaseNum) {
      btn.classList.add('active-case');
      btn.style.background = 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)';
      btn.style.color = 'white';
      btn.style.border = '2px solid white';
    } else {
      btn.classList.remove('active-case');
      btn.style.background = 'rgba(255,255,255,0.95)';
      btn.style.color = '#4a90e2';
      btn.style.border = '2px solid transparent';
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add click handlers to country buttons (top buttons)
  const countryButtons = document.querySelectorAll('.case-btn');
  countryButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const country = this.getAttribute('data-country');
      
      // Check if this button has a country attribute (China or Argentina)
      if (country) {
        loadProfileData(country);
      } else {
        currentCountry = null;
        profileData = [];
        // Clear the content for other countries
        document.getElementById('case-title').textContent = 'Select a Country';
        document.getElementById('case-content').innerHTML = 
          '<p style="text-align: center; color: #666;">Please click on 🇨🇳 China or 🇦🇷 Argentina above to view the profiles.</p>';
      }
    });
  });
  
  // Add click handlers to case number buttons (left sidebar)
  const caseButtons = document.querySelectorAll('.question-case-btn');
  caseButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (currentCountry) {
        const caseNum = parseInt(this.getAttribute('data-case-num'));
        const countryNameMap = {
          'china': 'China',
          'usa': 'USA',
          'japan': 'Japan',
          'germany': 'Germany',
          'india': 'India',
          'kenya': 'Kenya',
          'argentina': 'Argentina'
        };
        const countryName = countryNameMap[currentCountry];
        displayCase(caseNum, countryName);
      } else {
        alert('Please select a country from the top buttons first.');
      }
    });
  });
  
  // Load China data by default on page load
  loadProfileData('china');
});
