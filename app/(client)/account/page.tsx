import React from "react";

const AccountDashboard = () => {
  return (
    <div className="text-xs text-gray-600 space-y-2">
      <h3 className="font-bold text-gray-800 text-sm">
        Bienvenue dans votre espace client
      </h3>
      <p>
        Sélectionnez une option dans le menu de gauche pour gérer vos commandes, 
        modifier votre profil ou mettre à jour vos paramètres de sécurité.
      </p>
    </div>
  );
};

export default AccountDashboard;