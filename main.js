// Gestion des prestataires
const PKEY = 'providers';
let providers = [];

// Données initiales de démonstration
const initialProviders = [
    {
        id: 1,
        name: "Martin Dupont",
        job: "Plombier",
        zone: "Centre-ville",
        phone: "06 12 34 56 78",
        description: "Plombier certifié avec 15 ans d'expérience. Interventions rapides pour tous vos problèmes de plomberie.",
        validated: true,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "Sophie Laurent",
        job: "Coiffeur",
        zone: "Saint-Maurice",
        phone: "06 98 76 54 32",
        description: "Salon de coiffure pour hommes et femmes. Coupes modernes, colorations et soins capillaires.",
        validated: true,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "Le Bistrot du Marché",
        job: "Restaurant",
        zone: "Bourgneuf",
        phone: "05 46 78 90 12",
        description: "Cuisine traditionnelle française avec des produits frais du marché. Menu du jour et spécialités régionales.",
        validated: true,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8e0?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 4,
        name: "Boulangerie Artisanale",
        job: "Boulanger",
        zone: "Les Sables",
        phone: "05 46 23 45 67",
        description: "Pain artisanal, viennoiseries fraîches, pâtisseries maison. Tout est préparé sur place avec des ingrédients locaux.",
        validated: true,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 5,
        name: "Marie Couture",
        job: "Couturier",
        zone: "Château-Gaillard",
        phone: "06 45 67 89 01",
        description: "Créations sur mesure, retouches, réparations. Spécialisée dans les vêtements féminins et les costumes.",
        validated: true,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 6,
        name: "Vert Jardin",
        job: "Jardinier",
        zone: "Centre-ville",
        phone: "06 78 90 12 34",
        description: "Entretien de jardins, création d'espaces verts, taille d'arbustes. Service professionnel et écologique.",
        validated: true,
        image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 7,
        name: "Électricité Pro",
        job: "Électricien",
        zone: "Saint-Maurice",
        phone: "06 23 45 67 89",
        description: "Installation électrique, dépannages, mises aux normes. Devis gratuit et interventions rapides.",
        validated: true,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 8,
        name: "Auto Service Plus",
        job: "Mécanicien",
        zone: "Bourgneuf",
        phone: "05 46 12 34 56",
        description: "Réparation automobile, entretien, contrôle technique. Toutes marques et tous types de véhicules.",
        validated: true,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    }
];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeProviders();
    setupEventListeners();
    renderProviders();
    animateOnScroll();
});

function initializeProviders() {
    const savedProviders = localStorage.getItem(PKEY);
    if (savedProviders) {
        providers = JSON.parse(savedProviders);
    } else {
        providers = initialProviders;
        saveProviders();
    }
}

function saveProviders() {
    localStorage.setItem(PKEY, JSON.stringify(providers));
}

function setupEventListeners() {
    // Filtres
    document.getElementById('searchBtn').addEventListener('click', filterProviders);
    document.getElementById('zoneFilter').addEventListener('change', filterProviders);
    document.getElementById('metierFilter').addEventListener('change', filterProviders);
    
    // Formulaire
    document.getElementById('providerForm').addEventListener('submit', handleFormSubmit);
    
    // Menu mobile
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
}

function filterProviders() {
    const zoneFilter = document.getElementById('zoneFilter').value;
    const metierFilter = document.getElementById('metierFilter').value;
    
    const filteredProviders = providers.filter(provider => {
        const matchesZone = zoneFilter === 'Tous' || provider.zone === zoneFilter;
        const matchesMetier = metierFilter === 'Tous' || provider.job === metierFilter;
        return matchesZone && matchesMetier && provider.validated;
    });
    
    renderProviders(filteredProviders);
}

function renderProviders(providersToRender = null) {
    const providerList = document.getElementById('providerList');
    const noResults = document.getElementById('noResults');
    
    const providersList = providersToRender || providers.filter(p => p.validated);
    
    if (providersList.length === 0) {
        providerList.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    providerList.innerHTML = providersList.map(provider => `
        <div class="provider-card bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
            <div class="aspect-w-1 aspect-h-1">
                <img src="${provider.image}" alt="${provider.name}" class="w-full h-48 object-cover">
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-serif text-xl font-semibold text-gray-800">${provider.name}</h4>
                    <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                        ${provider.job}
                    </span>
                </div>
                <div class="flex items-center text-gray-600 mb-3">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    ${provider.zone}
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">${provider.description}</p>
                <div class="flex items-center justify-between">
                    <a href="tel:${provider.phone}" class="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        ${provider.phone}
                    </a>
                    <button onclick="viewProviderDetails(${provider.id})" class="text-gray-500 hover:text-gray-700 font-medium">
                        Voir détails
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Animer l'apparition des cartes
    setTimeout(() => {
        const cards = document.querySelectorAll('.provider-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('providerName').value,
        job: document.getElementById('providerJob').value,
        zone: document.getElementById('providerZone').value,
        phone: document.getElementById('providerPhone').value,
        description: document.getElementById('providerDescription').value,
        validated: false,
        image: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face`
    };
    
    // Générer un ID unique
    formData.id = Date.now();
    
    // Ajouter le prestataire
    providers.push(formData);
    saveProviders();
    
    // Réinitialiser le formulaire
    document.getElementById('providerForm').reset();
    
    // Afficher le modal de succès
    showSuccessModal();
}

function showSuccessModal() {
    document.getElementById('successModal').classList.remove('hidden');
    
    // Animation du modal
    anime({
        targets: '#successModal .bg-white',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

function viewProviderDetails(providerId) {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
        // Créer une URL avec les paramètres du prestataire
        const params = new URLSearchParams({
            id: provider.id,
            name: provider.name,
            job: provider.job,
            zone: provider.zone,
            phone: provider.phone,
            description: provider.description,
            image: provider.image
        });
        window.location.href = `provider.html?${params.toString()}`;
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleMobileMenu() {
    // Pour une version mobile plus complète, vous pourriez ajouter un menu déroulant ici
    alert('Menu mobile - Fonctionnalité à développer selon les besoins spécifiques');
}

function animateOnScroll() {
    // Animation de la section hero
    anime({
        targets: '#home h2',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutQuad'
    });
    
    anime({
        targets: '#home p',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 400,
        easing: 'easeOutQuad'
    });
    
    anime({
        targets: '#home button',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 600,
        delay: 600,
        easing: 'easeOutQuad'
    });
}

// Fonctions utilitaires pour l'administration
function getPendingProviders() {
    return providers.filter(p => !p.validated);
}

function validateProvider(providerId) {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
        provider.validated = true;
        saveProviders();
        renderProviders();
    }
}

function deleteProvider(providerId) {
    providers = providers.filter(p => p.id !== providerId);
    saveProviders();
    renderProviders();
}