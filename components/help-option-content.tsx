interface HelpOptionContentProps {
  option: string
}

export function HelpOptionContent({ option }: HelpOptionContentProps) {
  switch (option) {
    case "Hire talent":
      return (
        <div className="space-y-2">
          <p>
            Use{" "}
            <a
              href="https://zindi.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Zindi
            </a>
            , the largest professional network for data scientists in Africa!
          </p>
        </div>
      )
    case "Learn AI skills":
      return (
        <div className="space-y-2">
          <p>
            Try{" "}
            <a
              href="https://aws.amazon.com/about-aws/our-impact/scholars/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              AWS AI/ML Scholars
            </a>{" "}
            to learn from AI experts and get hands-on experience on real-world projects.
          </p>
          <p>
            Explore{" "}
            <a
              href="https://aiskillsnavigator.microsoft.com/en-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Microsoft AI Fluency
            </a>{" "}
            learning path for in-demand AI skills.
          </p>
          <p>
            Validate your AI, ML, and generative AI knowledge with the{" "}
            <a
              href="https://aws.amazon.com/certification/certified-ai-practitioner/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              AWS Certified AI Practitioner
            </a>{" "}
            Certification.
          </p>
        </div>
      )
    case "Get compute resources":
      return (
        <div className="space-y-2">
          <p>
            <a
              href="https://www.hpc.cineca.it/training/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              CINECA
            </a>{" "}
            is home to the largest High-Performance Computing facility in Italy. They offer a range of training,
            including online events.
          </p>
          <p>
            Take advantage of the latest technical training from{" "}
            <a
              href="https://www.nvidia.com/en-gb/training/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              NVIDIA
            </a>{" "}
            to gain hands-on experience and expert knowledge in AI, data science, and more.
          </p>
          <p>
            Use{" "}
            <a
              href="https://aws.amazon.com/what-is-cloud-computing/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              AWS training and certification programs
            </a>{" "}
            to learn the fundamentals of compute and machine learning.
          </p>
          <p>
            Assess your organization&apos;s readiness for cloud solutions with the{" "}
            <a
              href="https://cloudreadiness.amazonaws.com/#/cart"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              AWS Cloud Readiness Assessment
            </a>
            .
          </p>
        </div>
      )
    case "Cloud data storage":
      return (
        <div className="space-y-2">
          <p>
            <a
              href="https://www.cassava.ai/cassava-intelligence/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Cassava
            </a>{" "}
            provides compute credits and resources to organizations and businesses across Africa and the Middle East.
          </p>
          <p>
            Access{" "}
            <a
              href="https://cloud.google.com/free"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Google Cloud Credits
            </a>{" "}
            — available to academics, startups, nonprofits, and individuals experimenting with AI.
          </p>
          <p>
            <a
              href="https://aws.amazon.com/free/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              AWS Free Tier
            </a>{" "}
            offers 750 free compute hours per month.
          </p>
        </div>
      )
    case "Connect with experts":
      return (
        <div className="space-y-2">
          <p>
            Get in touch with{" "}
            <a
              href="https://axumai.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Axum
            </a>
            , which empowers Africans with custom open-source solutions and a team of experts.
          </p>
          <p>
            Join{" "}
            <a
              href="https://africonnect.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              AfriLabs Connect
            </a>
            , the largest community of innovation enablers in Africa.
          </p>
        </div>
      )
    case "Source quality data":
      return (
        <div className="space-y-2">
          <p>
            Join{" "}
            <a
              href="https://www.masakhane.io/home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Masakhane
            </a>{" "}
            to support African NLP research.
          </p>
          <p>
            Find the largest public Arabic NLP dataset catalog on{" "}
            <a
              href="https://github.com/ARBML/masader"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              GitHub
            </a>
            .
          </p>
          <p>
            Use publicly available datasets from the{" "}
            <a
              href="https://miiafrica.org/resources/data-science/data-sets/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Machine Intelligence Institute of Africa
            </a>
            .
          </p>
          <p>
            Explore this{" "}
            <a
              href="https://medium.com/@amnahhmohammed/useful-arabic-datasets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Medium article
            </a>{" "}
            with curated Arabic datasets for NLP.
          </p>
          <p>
            Access 18 newly released datasets from the{" "}
            <a
              href="https://lacunafund.org/lacuna-fund-releases-18-new-ai-datasets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Lacuna Fund
            </a>{" "}
            for agriculture, health, climate, and NLP domains.
          </p>
        </div>
      )
    case "I need investment":
      return (
        <div className="space-y-2">
          <p>
            <a
              href="https://seedstars-africa.vc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Seedstars
            </a>{" "}
            offers early-stage funding for African startups across sectors.
          </p>
          <p>
            Apply for equity funding and AI acceleration via the{" "}
            <a
              href="https://labs.google/aifuturesfund"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Google AI Futures Fund
            </a>
            .
          </p>
          <p>
            <a
              href="https://www.funema.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Funema
            </a>{" "}
            has provided over $2 million in loans to 300+ small businesses for fast access to working capital.
          </p>
          <p>
            We&apos;re scouting more funding sources — sign up to our mailing list and we&apos;ll notify you of new
            opportunities.
          </p>
        </div>
      )
    case "Scale your startup":
      return (
        <div className="space-y-2">
          <p>
            Accelerate growth with the{" "}
            <a
              href="https://labs.google/aifuturesfund"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Google AI Futures Fund
            </a>{" "}
            through early access to DeepMind&apos;s AI models and funding.
          </p>
          <p>
            Hire talent with flexibility using{" "}
            <a
              href="https://www.selatech.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071BC] hover:underline"
            >
              Selatech
            </a>
            , a platform offering affordable tech hiring solutions.
          </p>
        </div>
      )
    case "Something else":
      return (
        <div>
          <p>
            Unfortunately, I don&apos;t have an answer for you yet. Sign up and I&apos;ll email you once more answers
            are available.
          </p>
        </div>
      )
    default:
      return null
  }
}
