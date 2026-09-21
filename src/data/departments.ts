import {
  Baby,
  Bone,
  Brain,
  Flower2,
  HeartPulse,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export interface SiteDepartment {
  slug: string;
  name: string;
  tagline: string;
  keyword: string;
  icon: LucideIcon;
  overview: string[];
  conditions: string[];
  services: string[];
  symptoms: string[];
}

export const siteDepartments: SiteDepartment[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    tagline: "Advanced heart and cardiovascular care.",
    keyword: "cardio",
    icon: HeartPulse,
    overview: [
      "Our cardiology team diagnoses, treats and helps prevent conditions of the heart and blood vessels, from high blood pressure to heart rhythm problems.",
      "We combine careful examination, modern testing and clear guidance so you understand your heart health and the steps to protect it.",
    ],
    conditions: [
      "High blood pressure (hypertension)",
      "Coronary artery disease",
      "Heart failure",
      "Irregular heartbeat (arrhythmia)",
      "Chest pain and angina",
      "High cholesterol",
    ],
    services: [
      "ECG and stress testing",
      "Echocardiography",
      "Blood pressure and cholesterol management",
      "Heart health screening",
      "Follow-up care after heart events",
      "Lifestyle and prevention counselling",
    ],
    symptoms: [
      "Chest pain or pressure",
      "Shortness of breath",
      "Racing or irregular heartbeat",
      "Dizziness or fainting",
      "Swelling in the legs or feet",
    ],
  },
  {
    slug: "neurology",
    name: "Neurology",
    tagline: "Specialized care for the brain and nervous system.",
    keyword: "neuro",
    icon: Brain,
    overview: [
      "Neurology focuses on conditions affecting the brain, spinal cord and nerves. Our specialists assess symptoms carefully to reach an accurate diagnosis.",
      "From long-standing headaches to nerve pain and seizures, we build a treatment plan around your needs and daily life.",
    ],
    conditions: [
      "Migraine and chronic headaches",
      "Epilepsy and seizures",
      "Stroke and stroke recovery",
      "Parkinson's disease",
      "Nerve damage and neuropathy",
      "Memory problems",
    ],
    services: [
      "Neurological examination",
      "Headache and migraine management",
      "Epilepsy care and monitoring",
      "Stroke follow-up and recovery guidance",
      "Nerve pain treatment",
      "Referrals for brain and nerve tests",
    ],
    symptoms: [
      "Frequent or severe headaches",
      "Numbness or tingling",
      "Seizures or blackouts",
      "Sudden weakness on one side",
      "Memory loss or confusion",
    ],
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    tagline: "Complete healthcare for infants, children and teens.",
    keyword: "pediatric",
    icon: Baby,
    overview: [
      "Our pediatricians care for children from birth through adolescence, in a friendly setting that helps young patients feel at ease.",
      "We support healthy growth with regular check-ups, vaccinations and prompt treatment when your child is unwell.",
    ],
    conditions: [
      "Fever, cough and common colds",
      "Childhood infections",
      "Asthma and allergies",
      "Growth and development concerns",
      "Nutrition and feeding problems",
      "Stomach and digestive issues",
    ],
    services: [
      "Newborn and infant care",
      "Routine vaccinations",
      "Growth and development monitoring",
      "Child nutrition guidance",
      "Treatment of common childhood illnesses",
      "Adolescent health advice",
    ],
    symptoms: [
      "Fever that does not settle",
      "Difficulty breathing",
      "Poor feeding or weight gain",
      "Skin rashes",
      "Delayed milestones",
    ],
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    tagline: "Comprehensive healthcare for all ages.",
    keyword: "general",
    icon: Stethoscope,
    overview: [
      "General medicine is often your first stop. Our physicians diagnose and treat a wide range of everyday and long-term conditions in adults.",
      "We look after the whole person, manage ongoing conditions and refer you to the right specialist whenever you need one.",
    ],
    conditions: [
      "Fever and infections",
      "Diabetes",
      "High blood pressure",
      "Digestive problems",
      "Thyroid disorders",
      "Chest and respiratory infections",
    ],
    services: [
      "General consultation",
      "Chronic disease management",
      "Health check-ups",
      "Preventive screening",
      "Adult vaccinations",
      "Referrals to specialists",
    ],
    symptoms: [
      "Fever lasting several days",
      "Constant tiredness",
      "Unexplained weight change",
      "Persistent cough",
      "Ongoing stomach pain",
    ],
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    tagline: "Expert care for skin, hair and nails.",
    keyword: "dermat",
    icon: Sparkles,
    overview: [
      "Our dermatology team treats medical and cosmetic concerns of the skin, hair and nails for patients of all ages.",
      "We focus on finding the cause of the problem and creating a simple, effective care plan you can follow at home.",
    ],
    conditions: [
      "Acne and breakouts",
      "Eczema",
      "Psoriasis",
      "Fungal skin infections",
      "Hair loss",
      "Allergic rashes",
    ],
    services: [
      "Skin consultation",
      "Acne treatment",
      "Rash and allergy care",
      "Hair and scalp treatment",
      "Minor skin procedures",
      "Daily skin care advice",
    ],
    symptoms: [
      "Rash or itching that will not go away",
      "Severe or scarring acne",
      "Moles that change shape or colour",
      "Thinning hair or bald patches",
      "Recurring skin infections",
    ],
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    tagline: "Care for bones, joints and muscles.",
    keyword: "orthop",
    icon: Bone,
    overview: [
      "Orthopedics deals with the bones, joints, ligaments and muscles that keep you moving. Our specialists treat injuries and long-term joint problems.",
      "We aim to relieve pain, restore movement and help you return to the activities you enjoy.",
    ],
    conditions: [
      "Fractures and broken bones",
      "Arthritis",
      "Back and neck pain",
      "Sports injuries",
      "Joint pain",
      "Osteoporosis",
    ],
    services: [
      "Fracture assessment and care",
      "Joint pain management",
      "Sports injury treatment",
      "Physiotherapy guidance",
      "Care before and after surgery",
      "Bone health screening",
    ],
    symptoms: [
      "Joint swelling or stiffness",
      "Ongoing back pain",
      "Limited movement",
      "Pain after an injury or fall",
      "Bone pain",
    ],
  },
  {
    slug: "gynecology",
    name: "Gynecology",
    tagline: "Women's health, pregnancy and reproductive care.",
    keyword: "gyn",
    icon: Flower2,
    overview: [
      "Our gynecologists provide caring, confidential healthcare for women at every stage of life, from routine check-ups to pregnancy care.",
      "We take time to listen, explain your options clearly and support your health with respect and privacy.",
    ],
    conditions: [
      "Irregular or painful periods",
      "Polycystic ovary syndrome (PCOS)",
      "Pregnancy care",
      "Menopause symptoms",
      "Infections",
      "Fertility concerns",
    ],
    services: [
      "Antenatal check-ups",
      "Women's health screening",
      "Family planning advice",
      "Menstrual disorder care",
      "Menopause management",
      "Postnatal care",
    ],
    symptoms: [
      "Irregular or very painful periods",
      "Pelvic pain",
      "Pregnancy symptoms or concerns",
      "Unusual discharge",
      "Difficulty conceiving",
    ],
  },
];

export const getSiteDepartment = (slug?: string) =>
  siteDepartments.find((department) => department.slug === slug);
