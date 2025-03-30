import groopsLogo from "../assets/images/groops-logo.png";
import groopsLogoText from "../assets/images/groops.png";

export function Logo() {
  return (
    <div className="flex items-center">
      <img src={groopsLogoText} alt="Groops Logo" className="w-48 h-24" />
      <div className="inline-block p-3 bg-mint-200 rounded-full mb-6">
        <img src={groopsLogo} alt="Groops Logo" className="w-16 h-16" />
      </div>
    </div>
  );
}
