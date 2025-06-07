export class LamesActor extends Actor {
    prepareData() {
        super.prepareData();

        // Initialise le tableau s’il n’existe pas déjà
        if (!this.system.vitaliteTenacite || !Array.isArray(this.system.vitaliteTenacite)) {
            this.updateSource({
                "system.vitaliteTenacite": Array(8).fill("empty")
            });
        }
    }
}