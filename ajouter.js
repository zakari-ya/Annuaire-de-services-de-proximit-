// Variable to store loaded descriptions
let descriptionsData = {};

// Load descriptions from JSON file
async function loadDescriptions() {
  try {
    const response = await fetch('descriptions.json');
    descriptionsData = await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des descriptions:', error);
    // Fallback descriptions in case JSON fails to load
    descriptionsData = {
      descriptions: {
        "Plombier": "{{name}} est un plombier professionnel situé à {{zone}}. Services de plomberie résidentielle et commerciale.",
        "Coiffeur": "Salon de coiffure {{name}} à {{zone}}. Coupes, colorations et soins capillaires.",
        "Restaurant": "Restaurant {{name}} à {{zone}}. Cuisine authentique et ambiance conviviale.",
        "Boulanger": "Boulangerie {{name}} à {{zone}}. Pain frais et viennoiseries maison.",
        "Couturier": "Atelier de couture {{name}} à {{zone}}. Retouches et créations sur mesure.",
        "Jardinier": "Service de jardinage {{name}} à {{zone}}. Entretien d'espaces verts.",
        "Électricien": "Électricien professionnel {{name}} à {{zone}}. Installation et dépannage électrique.",
        "Mécanicien": "Garage automobile {{name}} à {{zone}}. Réparation et entretien de véhicules.",
        "Services à la personne": "{{name}} propose des services à la personne à {{zone}}. Aide à domicile et accompagnement.",
        "Services aux entreprises": "{{name}} - Services aux entreprises à {{zone}}. Solutions professionnelles adaptées.",
        "Herboristerie": "Herboristerie {{name}} à {{zone}}. Plantes médicinales et conseils en phytothérapie.",
        "Site d'information": "{{name}} - Site d'information local à {{zone}}. Actualités et événements locaux.",
        "Police - Justice": "{{name}} - Service de police et justice à {{zone}}. Sécurité publique et assistance.",
        "Cours de langues": "{{name}} - Cours de langues à {{zone}}. Apprentissage personnalisé pour tous niveaux.",
        "Administration - Service public": "{{name}} - Service public à {{zone}}. Accompagnement administratif.",
        "Création d'entreprise": "{{name}} - Conseil en création d'entreprise à {{zone}}. Accompagnement personnalisé.",
        "Médecins": "Cabinet médical {{name}} à {{zone}}. Soins de santé primaires et consultations."
      }
    };
  }
}

// Generate description based on job, name, and zone
function generateDescription() {
  const job = document.getElementById('providerJob').value;
  const name = document.getElementById('providerName').value;
  const zone = document.getElementById('providerZone').value;
  
  if (!job || !name || !zone) {
    alert('Veuillez remplir les champs Nom du prestataire, Métier et Quartier avant de générer une description.');
    return;
  }
  
  const template = descriptionsData.descriptions[job];
  if (template) {
    let description = template
      .replace(/{{name}}/g, name)
      .replace(/{{zone}}/g, zone);
    
    document.getElementById('providerDescription').value = description;
  } else {
    alert('Aucune description prédéfinie disponible pour ce métier.');
  }
}

// Add generate description button to the form
function addGenerateDescriptionButton() {
  const descriptionGroup = document.querySelector('.form-group-full');
  const generateButton = document.createElement('button');
  generateButton.type = 'button';
  generateButton.id = 'generateDescriptionBtn';
  generateButton.className = 'mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm';
  generateButton.textContent = 'Générer une description automatique';
  generateButton.onclick = generateDescription;
  
  // Insert button after the label
  const label = descriptionGroup.querySelector('.form-label');
  label.insertAdjacentElement('afterend', generateButton);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadDescriptions().then(() => {
    addGenerateDescriptionButton();
  });
  
  // Rest of your existing code...
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  // Close mobile menu when clicking on any link
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
    });
  });
  
  // Optional: Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

function getServiceImage(serviceType) {
  const imageMap = {
    "Services à la personne": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    "Services aux entreprises": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop",
    "Herboristerie": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
    "Site d'information": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&h=300&fit=crop",
    "Police - Justice": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop",
    "Cours de langues": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=300&fit=crop",
    "Administration - Service public": "https://images.unsplash.com/photo-1551135049-8a33b42738b4?w=300&h=300&fit=crop",
    "Création d'entreprise": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop",
    "Médecins": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=300&fit=crop",
    "Plombier": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    "Coiffeur": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    "Restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    "Boulanger": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    "Couturier": "https://images.unsplash.com/photo-1594736797933-d0d69c3d15d3?w=400",
    "Jardinier": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400",
    "Électricien": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    "Mécanicien": "https://images.unsplash.com/photo-1581093458791-8a6a5d583c5e?w=400",
  };
  return imageMap[serviceType] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop";
}

// Gestion du formulaire
document.getElementById("providerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Récupération des données du formulaire
  const providerData = {
    id: Date.now().toString(),
    name: document.getElementById("providerName").value,
    job: document.getElementById("providerJob").value,
    zone: document.getElementById("providerZone").value,
    phone: document.getElementById("providerPhone").value,
    description: document.getElementById("providerDescription").value,
    validated: false,
    image: getServiceImage(document.getElementById("providerJob").value),
    source: "local",
  };

  // Récupération des prestataires existants
  let providers = JSON.parse(localStorage.getItem("providers") || "[]");

  // Ajout du nouveau prestataire
  providers.push(providerData);

  // Sauvegarde dans le localStorage
  localStorage.setItem("providers", JSON.stringify(providers));

  // Définir le flag pour afficher le modal sur la page d'accueil
  sessionStorage.setItem("showSuccessModal", "true");

  // Afficher le modal de succès
  document.getElementById("successModal").classList.add("visible");

  // Réinitialisation du formulaire
  document.getElementById("providerForm").reset();

  // Optionnel : Redirection après 2 secondes
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
});

function closeModal() {
  document.getElementById("successModal").classList.remove("visible");
  window.location.href = "index.html";
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  } else {
    alert("Menu mobile - Fonctionnalité à développer selon les besoins spécifiques");
  }
}