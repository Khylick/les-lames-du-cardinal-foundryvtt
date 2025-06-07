import {PROFILS} from "../data/profils.js";

export class LamesCharacterSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["les-lames", "sheet", "actor"],
            template: "systems/les-lames-du-cardinal/templates/actor/character-sheet.hbs",
            width: 1200,
            height: 900,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    getData() {
        const context = super.getData();
        context.system = this.document.system;
        context.profils = PROFILS;

        console.log("Profils :", context.profils);

        return context;
    }

    sendChatMessage(content) {
        ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: `<p>${content}</p>`
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        const actor = this.document;

        // Click sur les cases Vitalité/Tenacité
        html.find(".vitalite-tenacite .case").on("click", async (event) => {
            const index = Number(event.currentTarget.dataset.index);
            const actor = this.document;

            // Copie du tableau actuel
            const tableau = [...actor.system.vitaliteTenacite];

            // Calcul du prochain état
            let next = "empty";
            if (tableau[index] === "empty") next = "checked";
            else if (tableau[index] === "checked") next = "crossed";

            // Mise à jour de l'élément cliqué
            tableau[index] = next;

            // Mise à jour de tout le tableau
            await actor.update({
                "system.vitaliteTenacite": tableau
            });

            this.render();
        });

        // 🩹 Soigner → transforme tous les "crossed" en "empty"
        html.find(".btn-soigner").on("click", async () => {
            const tableau = actor.system.vitaliteTenacite.map((c) =>
                c === "crossed" ? "empty" : c
            );
            await actor.update({ "system.vitaliteTenacite": tableau });
            this.sendChatMessage(`${actor.name} se soigne et récupère sa Vitalité.`);
            this.render();
        });

        // 😴 Se reposer → transforme tous les "checked" en "empty"
        html.find(".btn-reposer").on("click", async () => {
            const tableau = actor.system.vitaliteTenacite.map((c) =>
                c === "checked" ? "empty" : c
            );
            await actor.update({ "system.vitaliteTenacite": tableau });
            this.sendChatMessage(`${actor.name} se repose et récupère sa Ténacité.`);
            this.render();
        });

        // Action d'affichage des profils
        html.find(".toggle-profils").on("click", async () => {
            const content = await renderTemplate("systems/les-lames-du-cardinal/templates/partials/profil-selection-modal.hbs", {
                profils: PROFILS
            });

            new Dialog({
                title: "Sélection de vos profils",
                content: content,
                buttons: {
                    close: {
                        label: "Fermer"
                    }
                },
                render: (html) => {
                    html.find(".profil-carte").on("click", function (event) {
                        if (event.target.classList.contains("choisir-profil")) return;
                        $(this).toggleClass("flipped");
                    });

                    html.find(".choisir-profil").on("click", async function () {
                       const key = $(this).closest(".profil-carte-container").data("key");
                       const actor = game.actors.get(html.data("actorId"));
                       const current = actor.system.profilsChoisis || [];

                       if (current.length >= 2) {
                           ui.notification.warn("Deux profils sont déjà sélectionnés.");
                           return;
                       }

                       current.push(PROFILS[key]);

                       await actor.update({ "system.profilsChoisis": current });
                       actor.sheet.render(true);
                    });
                }
            }).render(true);
        });
    }
}