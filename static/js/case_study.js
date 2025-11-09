// Case Study Data for DeepPersona
const caseData = {
  1: {
    title: "Kenya",
    question: "<strong>Example Question:</strong> Persona generation scenario for Case 1",
    answer: "Example Answer",
    success: {
      title: "Success Case: DeepPersona",
      content: "<p>Detailed success case content will be displayed here.</p>"
    },
    failure: {
      title: "Failure Case: Baseline Method",
      content: "<p>Detailed failure case content will be displayed here.</p>"
    }
  },
  2: {
    title: "USA",
    question: "<strong>Example Question:</strong> Persona generation scenario for Case 2",
    answer: "Example Answer",
    success: {
      title: "Success Case: DeepPersona",
      content: "<p>Detailed success case content will be displayed here.</p>"
    },
    failure: {
      title: "Failure Case: Baseline Method",
      content: "<p>Detailed failure case content will be displayed here.</p>"
    }
  },
  3: {
    title: "Japan",
    question: "<strong>Example Question:</strong> Persona generation scenario for Case 3",
    answer: "Example Answer",
    success: {
      title: "Success Case: DeepPersona",
      content: "<p>Detailed success case content will be displayed here.</p>"
    },
    failure: {
      title: "Failure Case: Baseline Method",
      content: "<p>Detailed failure case content will be displayed here.</p>"
    }
  },
  4: {
    title: "India",
    question: "<strong>Example Question:</strong> Persona generation scenario for Case 4",
    answer: "Example Answer",
    success: {
      title: "Success Case: DeepPersona",
      content: "<p>Detailed success case content will be displayed here.</p>"
    },
    failure: {
      title: "Failure Case: Baseline Method",
      content: "<p>Detailed failure case content will be displayed here.</p>"
    }
  },
  5: {
    title: "Germany",
    question: "<strong>Example Question:</strong> Persona generation scenario for Case 5",
    answer: "Example Answer",
    success: {
      title: "Success Case: DeepPersona",
      content: "<p>Detailed success case content will be displayed here.</p>"
    },
    failure: {
      title: "Failure Case: Baseline Method",
      content: "<p>Detailed failure case content will be displayed here.</p>"
    }
  },
  6: {
    title: "China",
    question: "<strong>Example Question:</strong> Persona generation scenario for Case 6",
    answer: "Example Answer",
    success: {
      title: "Success Case: DeepPersona",
      content: "<p>Detailed success case content will be displayed here.</p>"
    },
    failure: {
      title: "Failure Case: Baseline Method",
      content: "<p>Detailed failure case content will be displayed here.</p>"
    }
  },
  7: {
    title: "Argentina",
    question: "<strong>Example Question:</strong> Persona generation scenario for Case 7",
    answer: "Example Answer",
    success: {
      title: "Success Case: DeepPersona",
      content: "<p>Detailed success case content will be displayed here.</p>"
    },
    failure: {
      title: "Failure Case: Baseline Method",
      content: "<p>Detailed failure case content will be displayed here.</p>"
    }
  }
};

let currentCase = 1;
let currentView = 'success';

// Initialize case study functionality
document.addEventListener('DOMContentLoaded', function() {
  // Case button click handlers
  const caseBtns = document.querySelectorAll('.case-btn');
  caseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      caseBtns.forEach(b => b.classList.remove('is-primary'));
      // Add active class to clicked button
      this.classList.add('is-primary');
      
      // Update current case
      currentCase = parseInt(this.getAttribute('data-case'));
      updateContent();
    });
  });

  // View toggle button click handlers
  const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
  viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      viewToggleBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Update current view
      currentView = this.getAttribute('data-view');
      updateContent();
    });
  });

  // Load initial content
  updateContent();
});

function updateContent() {
  const caseQuestionDiv = document.getElementById('case-question');
  const caseAnswerSpan = document.getElementById('case-answer');
  const caseContentDiv = document.getElementById('case-content');
  const caseDetailsContainer = document.getElementById('case-details-container');
  
  if (caseData[currentCase]) {
    const data = caseData[currentCase];
    
    // Update question area
    caseQuestionDiv.innerHTML = `<p style="color: white;">${data.question}</p>`;
    
    // Update answer
    caseAnswerSpan.textContent = data.answer;
    
    // Update content based on current view (success or failure)
    const viewData = currentView === 'success' ? data.success : data.failure;
    
    // Update container style and title based on view
    if (currentView === 'success') {
      caseDetailsContainer.style.backgroundColor = '#e8f5e9';
      caseDetailsContainer.style.borderColor = '#4caf50';
      caseDetailsContainer.querySelector('.title').style.color = '#2e7d32';
      caseDetailsContainer.querySelector('.title').style.borderBottomColor = '#4caf50';
      caseDetailsContainer.querySelector('.title').textContent = viewData.title;
    } else {
      caseDetailsContainer.style.backgroundColor = '#ffebee';
      caseDetailsContainer.style.borderColor = '#f44336';
      caseDetailsContainer.querySelector('.title').style.color = '#c62828';
      caseDetailsContainer.querySelector('.title').style.borderBottomColor = '#f44336';
      caseDetailsContainer.querySelector('.title').textContent = viewData.title;
    }
    
    // Update content
    caseContentDiv.innerHTML = viewData.content;
  }
}
