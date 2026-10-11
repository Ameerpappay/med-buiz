// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Dynamic Product Catalog Data with Vibrant Visual Badges
const productsData = [
  {
    id: 1,
    name: "Universal Composite Resin",
    category: "restorative",
    icon: "fa-vial-circle-check",
    bgGradient: "from-blue-500/10 to-teal-500/10",
    iconColor: "text-navy-900",
    description:
      "High-radiopacity restorative composite syringe for anterior & posterior restorations.",
    specs: [
      "Shades: A1, A2, A3, B1",
      "Pack Size: 4g Syringe",
      "ISO 4049 Compliant",
    ],
  },
  {
    id: 2,
    name: "Rotary Ni-Ti Files Set",
    category: "endodontic",
    icon: "fa-code-branch",
    bgGradient: "from-teal-500/10 to-emerald-500/10",
    iconColor: "text-teal-500",
    description:
      "Flexible nickel-titanium root canal shaping files with high resistance to fatigue.",
    specs: ["Lengths: 21mm, 25mm", "Pack: 6 files", "Autoclavable"],
  },
  {
    id: 3,
    name: "High-Precision Alginate",
    category: "impression",
    icon: "fa-boxes-packing",
    bgGradient: "from-sky-500/10 to-indigo-500/10",
    iconColor: "text-sky-600",
    description:
      "Dust-free fast-setting alginate impression material with chromatic indicator.",
    specs: ["Fast Set (1m 30s)", "453g Pack", "Mint Flavor"],
  },
  {
    id: 4,
    name: "3-Ply Patient Bibs",
    category: "disposables",
    icon: "fa-box-tissue",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-600",
    description:
      "Waterproof absorbent bibs featuring 2-ply tissue plus 1-ply poly backing.",
    specs: ["Colors: Blue, Green, White", "125 pcs/box", "33cm x 45cm"],
  },
  {
    id: 5,
    name: "Glass Ionomer Luting Cement",
    category: "restorative",
    icon: "fa-mortar-pestle",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-navy-900",
    description:
      "Self-curing radiopaque glass ionomer luting cement for crowns & bridges.",
    specs: [
      "15g Powder + 10g Liquid",
      "Fluoride Releasing",
      "Low Film Thickness",
    ],
  },
  {
    id: 6,
    name: "Gutta Percha Points",
    category: "endodontic",
    icon: "fa-thumbtack",
    bgGradient: "from-teal-500/10 to-sky-500/10",
    iconColor: "text-teal-500",
    description:
      "Hand-rolled uniform taper points for precise root canal obturation.",
    specs: ["Taper: .04 / .06", "Sizes: #15 - #40", "60 points/box"],
  },
];

// Render Products Function
function renderProducts(items) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (product) => `
    <div class="product-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs relative group" data-category="${product.category}" data-name="${product.name.toLowerCase()}">
      <div class="h-48 bg-gradient-to-br ${product.bgGradient} flex items-center justify-center relative overflow-hidden">
        <i class="fa-solid ${product.icon} ${product.iconColor} text-5xl group-hover:scale-110 transition-transform"></i>
        <span class="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur text-navy-950 border border-slate-200/80 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">${product.category}</span>
      </div>
      <div class="p-6">
        <h3 class="font-bold text-slate-900 text-lg mb-1.5 group-hover:text-navy-900 transition-colors">${product.name}</h3>
        <p class="text-xs text-slate-500 mb-4 leading-relaxed">${product.description}</p>
        <ul class="text-xs text-slate-600 space-y-1.5 mb-6 border-t border-slate-100 pt-3 font-medium">
          ${product.specs.map((spec) => `<li class="flex items-center gap-1.5"><i class="fa-solid fa-check text-teal-500 text-[10px]"></i> <span class="text-slate-700">${spec}</span></li>`).join("")}
        </ul>
        <div class="grid grid-cols-2 gap-2.5">
            <button onclick="openProductInquiry('${product.name}')" class="border border-navy-900/80 text-navy-900 hover:bg-navy-900 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5">
                <i class="fa-regular fa-paper-plane"></i> Quote
            </button>
            <button onclick="sendWhatsAppInquiry('${product.name}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5">
                <i class="fa-brands fa-whatsapp text-sm"></i> WhatsApp
            </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Select Category via Link Click
function selectCategoryFilter(category) {
  const categoryFilter = document.getElementById("category-filter");
  if (categoryFilter) {
    categoryFilter.value = category;
    filterProducts();
  }
}

// Product Filtering
function filterProducts() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const categoryFilter = document.getElementById("category-filter").value;
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const name = product.getAttribute("data-name");
    const category = product.getAttribute("data-category");

    const matchesSearch = name.includes(searchInput);
    const matchesCategory =
      categoryFilter === "all" || category === categoryFilter;

    if (matchesSearch && matchesCategory) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// WhatsApp Direct Inquiry Handler
function sendWhatsAppInquiry(productName) {
  const phoneNumber = "1234567890"; // Replace with actual number
  const message = encodeURIComponent(
    `Hello MediDosth, I am interested in getting a price quote for: ${productName}. Please share pricing and stock details.`,
  );
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

// Inquiry Modal Controls
const modal = document.getElementById("inquiry-modal");
const modalTitle = document.getElementById("modal-title");
const modalSubtitle = document.getElementById("modal-subtitle");
const modalProductName = document.getElementById("modal-product-name");

function openInquiryModal() {
  modalTitle.textContent = "General Procurement Quote";
  modalSubtitle.textContent = "Tell us what supplies your facility requires.";
  modalProductName.value = "General Inquiry";
  modal.classList.remove("hidden");
}

function openProductInquiry(productName) {
  modalTitle.textContent = `Inquire: ${productName}`;
  modalSubtitle.textContent =
    "Request current stock and pricing for this item.";
  modalProductName.value = productName;
  modal.classList.remove("hidden");
}

function closeInquiryModal() {
  modal.classList.add("hidden");
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeInquiryModal();
  }
});

// Form Submissions
function handleQuickInquiry(e) {
  e.preventDefault();
  alert(
    "Thank you for your inquiry! Our dental sales representative will contact you shortly.",
  );
  e.target.reset();
}

function handleMainContact(e) {
  e.preventDefault();
  alert(
    "Your quote request has been submitted successfully. We will email/call you within 24 hours.",
  );
  e.target.reset();
}

function handleModalSubmit(e) {
  e.preventDefault();
  const product = modalProductName.value;
  alert(
    `Inquiry received for ${product}! Our team will get back to you with institutional pricing.`,
  );
  e.target.reset();
  closeInquiryModal();
}

// Initial Render
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(productsData);
});
