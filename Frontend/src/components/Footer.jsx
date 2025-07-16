import { Github, Twitter, Mail, Linkedin } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} SocialTalk. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a href="https://github.com/sachinkumar2222" target="_blank" rel="noreferrer" className="hover:text-primary">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://x.com/sparky_sachin" target="_blank" rel="noreferrer" className="hover:text-primary">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/sparky-sachin-kumar/" className="hover:text-primary">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
