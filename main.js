// Gestion des prestataires
const PKEY = "providers";
let providers = [];

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  loadProvidersData();
  setupEventListeners();
  animateOnScroll();
});

async function loadProvidersData() {
  try {
    // Charger les données depuis le fichier JSON
    const response = await fetch("services_marrakech.json");
    const servicesData = await response.json();

    // Transformer les données du JSON en format compatible avec notre application
    providers = servicesData.map((service) => ({
      id: service.id,
      name: service.name,
      job: service.service_type,
      zone: service.location,
      phone: service.phone || service.phone_raw,
      description:
        service.description || `${service.service_type} à ${service.location}`,
      validated: true,
      image: getServiceImage(service.service_type),
      rating: service.rating,
      reviews_count: service.reviews_count,
    }));

    saveProviders();
    renderProviders();

    // Mettre à jour les filtres
    updateFilters();
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    // Charger depuis le localStorage si disponible
    initializeProviders();
    renderProviders();
  }
}

function getServiceImage(serviceType) {
  const imageMap = {
    "Services à la personne":
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    "Services aux entreprises":
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop",
    Herboristerie:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
    "Site d'information":
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&h=300&fit=crop",
    "Police - Justice":
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop",
    "Cours de langues":
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=300&fit=crop",
    "Administration - Service public":
      "https://images.unsplash.com/photo-1551135049-8a33b42738b4?w=300&h=300&fit=crop",
    "Création d'entreprise":
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop",
    Médecins:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=300&fit=crop",
  };

  return (
    imageMap[serviceType] ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
  );
}

function initializeProviders() {
  const savedProviders = localStorage.getItem(PKEY);
  if (savedProviders) {
    providers = JSON.parse(savedProviders);
  }
}

function saveProviders() {
  localStorage.setItem(PKEY, JSON.stringify(providers));
}

function setupEventListeners() {
  // Filtres
  const searchBtn = document.getElementById("searchBtn");
  const zoneFilter = document.getElementById("zoneFilter");
  const metierFilter = document.getElementById("metierFilter");

  if (searchBtn) searchBtn.addEventListener("click", filterProviders);
  if (zoneFilter) zoneFilter.addEventListener("change", filterProviders);
  if (metierFilter) metierFilter.addEventListener("change", filterProviders);

  // Formulaire
  const providerForm = document.getElementById("providerForm");
  if (providerForm) {
    providerForm.addEventListener("submit", handleFormSubmit);
  }

  // Menu mobile
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }
}

function updateFilters() {
  const zoneFilter = document.getElementById("zoneFilter");
  const metierFilter = document.getElementById("metierFilter");

  if (!zoneFilter || !metierFilter) return;

  // Obtenir les zones uniques
  const zones = [...new Set(providers.map((p) => p.zone))].filter(
    (zone) => zone
  );
  // Obtenir les métiers uniques
  const metiers = [...new Set(providers.map((p) => p.job))].filter(
    (job) => job
  );

  // Mettre à jour le filtre des zones
  zoneFilter.innerHTML = '<option value="Tous">Toutes les zones</option>';
  zones.forEach((zone) => {
    const option = document.createElement("option");
    option.value = zone;
    option.textContent = zone;
    zoneFilter.appendChild(option);
  });

  // Mettre à jour le filtre des métiers
  metierFilter.innerHTML = '<option value="Tous">Tous les métiers</option>';
  metiers.forEach((metier) => {
    const option = document.createElement("option");
    option.value = metier;
    option.textContent = metier;
    metierFilter.appendChild(option);
  });
}

function filterProviders() {
  const zoneFilter = document.getElementById("zoneFilter")?.value || "Tous";
  const metierFilter = document.getElementById("metierFilter")?.value || "Tous";

  const filteredProviders = providers.filter((provider) => {
    const matchesZone =
      zoneFilter === "Tous" ||
      provider.zone.toLowerCase().includes(zoneFilter.toLowerCase());
    const matchesMetier =
      metierFilter === "Tous" || provider.job === metierFilter;
    return matchesZone && matchesMetier && provider.validated;
  });

  renderProviders(filteredProviders);
}

function renderProviders(providersToRender = null) {
  const providerList = document.getElementById("providerList");
  const noResults = document.getElementById("noResults");

  if (!providerList || !noResults) return;

  const providersList =
    providersToRender || providers.filter((p) => p.validated);

  if (providersList.length === 0) {
    providerList.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  providerList.innerHTML = providersList
    .map(
      (provider) => `
        <div class="provider-card bg-white rounded-2xl shadow-lg overflow-hidden card-hover transform transition-transform duration-300 hover:scale-105">
            <div class="aspect-w-1 aspect-h-1">
                <img src="${provider.image}" alt="${
        provider.name
      }" class="w-full h-48 object-cover">
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-serif text-xl font-semibold text-gray-800">${
                      provider.name
                    }</h4>
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
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">${
                  provider.description
                }</p>
                ${
                  provider.rating
                    ? `
                <div class="flex items-center mb-3">
                    <span class="text-yellow-500 mr-2">⭐ ${
                      provider.rating
                    }</span>
                    <span class="text-gray-500 text-sm">${
                      provider.reviews_count || ""
                    }</span>
                </div>
                `
                    : ""
                }
                <div class="flex items-center justify-between">
                    ${
                      provider.phone
                        ? `
                    <a href="tel:${provider.phone}" class="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        ${provider.phone}
                    </a>
                    `
                        : "<div></div>"
                    }
                    <button onclick="viewProviderDetails('${
                      provider.id
                    }')" class="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200">
                        Voir détails
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Animer l'apparition des cartes
  setTimeout(() => {
    const cards = document.querySelectorAll(".provider-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.5s ease";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      }, index * 100);
    });
  }, 100);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("providerName").value,
    job: document.getElementById("providerJob").value,
    zone: document.getElementById("providerZone").value,
    phone: document.getElementById("providerPhone").value,
    description: document.getElementById("providerDescription").value,
    validated: false,
    image: getServiceImage(document.getElementById("providerJob").value),
    id: Date.now().toString(),
  };

  // Ajouter le prestataire
  providers.push(formData);
  saveProviders();

  // Réinitialiser le formulaire
  document.getElementById("providerForm").reset();

  // Afficher le modal de succès
  showSuccessModal();

  // Mettre à jour les filtres
  updateFilters();
}

function showSuccessModal() {
  const successModal = document.getElementById("successModal");
  if (successModal) {
    successModal.classList.remove("hidden");

    // Animation du modal
    if (typeof anime !== "undefined") {
      anime({
        targets: "#successModal .bg-white",
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  }
}

function closeModal() {
  const successModal = document.getElementById("successModal");
  if (successModal) {
    successModal.classList.add("hidden");
  }
}

function viewProviderDetails(providerId) {
  const provider = providers.find((p) => p.id === providerId);
  if (provider) {
    // Créer une URL avec les paramètres du prestataire
    const params = new URLSearchParams({
      id: provider.id,
      name: provider.name,
      job: provider.job,
      zone: provider.zone,
      phone: provider.phone,
      description: provider.description,
      image: provider.image,
      rating: provider.rating || "",
      reviews_count: provider.reviews_count || "",
    });
    window.location.href = `provider.html?${params.toString()}`;
  }
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  } else {
    alert(
      "Menu mobile - Fonctionnalité à développer selon les besoins spécifiques"
    );
  }
}

function animateOnScroll() {
  // Animation simple sans dépendance à anime.js
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  const animatedElements = document.querySelectorAll(
    "#home h2, #home p, #home button"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
}

// Fonctions utilitaires pour l'administration
function getPendingProviders() {
  return providers.filter((p) => !p.validated);
}

function validateProvider(providerId) {
  const provider = providers.find((p) => p.id === providerId);
  if (provider) {
    provider.validated = true;
    saveProviders();
    renderProviders();
  }
}

function deleteProvider(providerId) {
  providers = providers.filter((p) => p.id !== providerId);
  saveProviders();
  renderProviders();
}
