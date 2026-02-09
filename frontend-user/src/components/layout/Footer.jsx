import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-gray-500 py-12 px-4 border-t border-gray-800 mt-12">
      <div className="container mx-auto text-center">
        <p className="mb-4">Des questions ? Appelez le 0800-000-000</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-left">
          <ul>
            <li>FAQ</li>
            <li>Presse</li>
          </ul>
          <ul>
            <li>Centre d’aide</li>
            <li>Recrutement</li>
          </ul>
          <ul>
            <li>Compte</li>
            <li>Mentions légales</li>
          </ul>
          <ul>
            <li>Media Center</li>
            <li>Confidentialité</li>
          </ul>
        </div>

        <p className="mt-8 text-xs">
          2026 Netflix Clone - Projet Pédagogique
        </p>
      </div>
    </footer>
  );
}

export default Footer;