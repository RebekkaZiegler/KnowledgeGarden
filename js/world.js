(function () {
  const promptEl = document.getElementById("world-prompt");
  const openUiBtn = document.getElementById("open-ui-btn");
  const parentEl = document.getElementById("phaser-game");

  if (!parentEl || !window.KG_UI) return;

  if (!window.Phaser) {
    if (promptEl) promptEl.textContent = "Phaser konnte nicht geladen werden.";
    return;
  }

  window.KG_UI.hideMainUi();

  if (openUiBtn) {
    openUiBtn.addEventListener("click", () => {
      window.KG_UI.openFromWorld({ section: "seed" });
    });
  }

  const BASE_ZONES = [
    { id: "seed", label: "Seed-Regal", section: "seed", x: 34, y: 36, w: 170, h: 92, color: 0x7aa889 },
    { id: "lab", label: "Labor", section: "lab", x: 730, y: 36, w: 190, h: 92, color: 0x8d7ec1 },
    { id: "combat", label: "Kampfzone", section: "combat", x: 40, y: 410, w: 220, h: 94, color: 0xd86b5f }
  ];

  const BED_SLOTS = [
    { x: 250, y: 162, w: 120, h: 84 },
    { x: 392, y: 162, w: 120, h: 84 },
    { x: 534, y: 162, w: 120, h: 84 },
    { x: 250, y: 264, w: 120, h: 84 },
    { x: 392, y: 264, w: 120, h: 84 },
    { x: 534, y: 264, w: 120, h: 84 }
  ];

  class WorldScene extends Phaser.Scene {
    constructor() {
      super("world");
      this.player = null;
      this.cursors = null;
      this.wasd = null;
      this.keyE = null;
      this.baseZones = [];
      this.bedZones = [];
      this.activeZone = null;
      this.lockedText = "";
      this.lockedTextUntil = 0;
      this.bedsSignature = "";
      this.overflowText = null;
    }

    create() {
      this.drawBackground();
      this.createBaseZones();
      this.refreshBedZones(true);
      this.createPlayer();
      this.setupInput();
      this.updatePrompt("Bewege dich mit WASD/Pfeiltasten. Bei Zone: [E] nutzen.");
    }

    drawBackground() {
      const g = this.add.graphics();
      g.fillStyle(0xd9ead9, 1);
      g.fillRect(0, 0, 960, 540);
      g.fillStyle(0xc6dcc6, 1);
      for (let y = 0; y < 540; y += 24) {
        for (let x = 0; x < 960; x += 24) {
          if (((x + y) / 24) % 2 === 0) g.fillRect(x, y, 24, 24);
        }
      }
      g.lineStyle(6, 0x5f7a64, 1);
      g.strokeRect(8, 8, 944, 524);
    }

    createBaseZones() {
      this.baseZones = BASE_ZONES.map((z) => this.createVisualZone(z));
    }

    createVisualZone(z) {
      const area = this.add.rectangle(z.x + (z.w / 2), z.y + (z.h / 2), z.w, z.h, z.color, 0.28);
      area.setStrokeStyle(2, 0x28374a, 0.9);
      const labelText = this.add.text(z.x + 8, z.y + 8, z.label, {
        fontFamily: "monospace",
        fontSize: "12px",
        color: "#223040"
      });
      return { ...z, area, labelText, plantNodes: [] };
    }

    destroyZoneVisual(z) {
      if (!z) return;
      if (z.area) z.area.destroy();
      if (z.labelText) z.labelText.destroy();
      if (Array.isArray(z.plantNodes)) {
        z.plantNodes.forEach((n) => {
          if (n && typeof n.destroy === "function") n.destroy();
        });
      }
    }

    getBedsSignature() {
      const worldBeds = window.KG_UI.getWorldBedDetails();
      const active = window.KG_UI.getActiveBedId() || "";
      const plantSig = worldBeds.map((b) => {
        const plants = (b.plants || []).map((p) =>
          `${p.id}:${Math.round((p.growth || 0) * 100)}:${p.withered ? 1 : 0}`
        ).join(",");
        return `${b.id}:${plants}`;
      }).join("|");
      return `${plantSig}::${active}`;
    }

    refreshBedZones(force) {
      const sig = this.getBedsSignature();
      if (!force && sig === this.bedsSignature) return;
      this.bedsSignature = sig;

      this.bedZones.forEach((z) => this.destroyZoneVisual(z));
      this.bedZones = [];
      if (this.overflowText) {
        this.overflowText.destroy();
        this.overflowText = null;
      }

      const worldBeds = window.KG_UI.getWorldBedDetails();
      const activeBedId = window.KG_UI.getActiveBedId();
      if (worldBeds.length === 0) return;

      const shown = worldBeds.slice(0, BED_SLOTS.length);
      const hiddenCount = Math.max(0, worldBeds.length - BED_SLOTS.length);

      this.bedZones = shown.map((bed, idx) => {
        const zone = this.createVisualZone({
        id: `bed-${bed.id}`,
        label: bed.title,
        section: "beds",
        bedId: bed.id,
        x: BED_SLOTS[idx].x,
        y: BED_SLOTS[idx].y,
        w: BED_SLOTS[idx].w,
        h: BED_SLOTS[idx].h,
        color: 0x6697c7
        });
        this.renderBedPlants(zone, bed.plants || []);
        return zone;
      });

      if (hiddenCount > 0) {
        this.overflowText = this.add.text(260, 138, `+${hiddenCount} weitere aktive Beete (Limit 6 im Raum)`, {
          fontFamily: "monospace",
          fontSize: "12px",
          color: "#274057"
        });
      }
    }

    renderBedPlants(zone, plants) {
      if (!zone || !Array.isArray(plants)) return;
      if (plants.length === 0) return;
      const cols = 2;
      const spacingX = zone.w / (cols + 1);
      const rows = Math.ceil(plants.length / cols);
      const spacingY = zone.h / (rows + 1);

      plants.forEach((plant, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cx = zone.x + spacingX * (col + 1);
        const cy = zone.y + spacingY * (row + 1) + 8;
        const growth = Math.max(0.2, Math.min(1.5, Number(plant.growth || 0.35)));
        const stemColor = plant.withered ? 0x8a6b47 : 0x2f6b3d;
        const crownColor = plant.withered ? 0xb79063 : 0x64b46d;
        const pot = this.add.rectangle(cx, cy + 8, 16, 6, 0x7b5a3a, 1);
        const nodes = [pot];

        if (plant.phase === "phase2") {
          const sprout = this.add.circle(cx, cy + 1, 6, plant.withered ? 0xb79063 : 0x6ebc73, 1);
          nodes.push(sprout);
        } else {
          const stemH = Math.round(10 + (growth * 22));
          const crownR = Math.round(6 + (growth * 12));
          const stem = this.add.rectangle(cx, cy + 3, 3, stemH, stemColor, 1).setOrigin(0.5, 1);
          const crown = this.add.circle(cx, cy + 3 - stemH, crownR, crownColor, 1);
          nodes.push(stem, crown);

          if ((plant.phase === "phase3" || plant.phase === "phase2_final") && plant.fruitCount > 0) {
            const fruits = Math.min(18, Math.max(0, Number(plant.fruitCount || 0)));
            for (let f = 0; f < fruits; f += 1) {
              const angle = (Math.PI * 2 * f) / fruits;
              const rr = crownR * (0.45 + ((f % 3) * 0.18));
              const fx = cx + Math.cos(angle) * rr;
              const fy = (cy + 3 - stemH) + Math.sin(angle) * rr;
              nodes.push(this.add.circle(fx, fy, 2, 0xc33a3a, 1));
            }
          }
        }

        const hit = this.add.rectangle(cx, cy, 28, 34, 0xffffff, 0.001);
        hit.setInteractive({ useHandCursor: true });
        hit.on("pointerdown", () => {
          window.KG_UI.openPlantFromWorld(zone.bedId, plant.id);
        });
        hit.on("pointerover", () => {
          this.updatePrompt(`[Klick] ${plant.label}`);
        });

        zone.plantNodes.push(...nodes, hit);
      });
    }

    createPlayer() {
      const sprite = this.add.rectangle(480, 440, 18, 18, 0x2f6b3d, 1);
      sprite.setStrokeStyle(2, 0xffffff, 1);
      this.physics.add.existing(sprite);
      this.player = sprite;
      this.player.body.setCollideWorldBounds(true);
      this.player.body.setDrag(1200, 1200);
      this.player.body.setMaxVelocity(270, 270);
      this.physics.world.setBounds(10, 10, 940, 520);
    }

    setupInput() {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
      });
      this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    update() {
      if (!this.player || !this.player.body) return;
      this.refreshBedZones(false);
      const speed = 240;
      const left = this.cursors.left.isDown || this.wasd.left.isDown;
      const right = this.cursors.right.isDown || this.wasd.right.isDown;
      const up = this.cursors.up.isDown || this.wasd.up.isDown;
      const down = this.cursors.down.isDown || this.wasd.down.isDown;

      let vx = 0;
      let vy = 0;
      if (left) vx -= speed;
      if (right) vx += speed;
      if (up) vy -= speed;
      if (down) vy += speed;
      if (vx !== 0 && vy !== 0) {
        vx *= 0.7071;
        vy *= 0.7071;
      }
      this.player.body.setVelocity(vx, vy);

      const zone = this.findNearbyZone();
      this.setActiveZone(zone);

      if (Phaser.Input.Keyboard.JustDown(this.keyE) && this.activeZone) {
        this.activateZone(this.activeZone);
      }

      if (this.lockedText && Date.now() > this.lockedTextUntil) {
        this.lockedText = "";
      }
      this.renderPrompt();
    }

    findNearbyZone() {
      const px = this.player.x;
      const py = this.player.y;
      let best = null;
      let bestDist = Infinity;
      const zones = [...this.baseZones, ...this.bedZones];
      for (const zone of zones) {
        const expanded = new Phaser.Geom.Rectangle(zone.x - 20, zone.y - 20, zone.w + 40, zone.h + 40);
        if (!Phaser.Geom.Rectangle.Contains(expanded, px, py)) continue;
        const cx = zone.x + (zone.w / 2);
        const cy = zone.y + (zone.h / 2);
        const d = Phaser.Math.Distance.Between(px, py, cx, cy);
        if (d < bestDist) {
          best = zone;
          bestDist = d;
        }
      }
      return best;
    }

    setActiveZone(zone) {
      if (zone === this.activeZone) return;
      if (this.activeZone) this.activeZone.area.setFillStyle(this.activeZone.color, 0.28);
      this.activeZone = zone;
      if (this.activeZone) this.activeZone.area.setFillStyle(0xfff0a6, 0.5);
    }

    activateZone(zone) {
      const unlocked = new Set(window.KG_UI.getUnlockedBeds());
      if (zone.bedId && !unlocked.has(zone.bedId)) {
        this.lockedText = "Dieses Beet ist noch nicht freigeschaltet.";
        this.lockedTextUntil = Date.now() + 1500;
        return;
      }
      if (zone.id === "combat") {
        const c = window.KG_UI.getCombatWorldState();
        if (!c.hasActiveBed) {
          this.lockedText = "Kampf gesperrt: Wähle erst ein aktives Beet im Seed-Menue.";
          this.lockedTextUntil = Date.now() + 1800;
          return;
        }
        if (!c.combatUnlocked) {
          this.lockedText = "Kampf gesperrt: Ernte zuerst alle Pflanzen des aktiven Beets.";
          this.lockedTextUntil = Date.now() + 1800;
          return;
        }
      }
      if (zone.id === "lab") {
        const l = window.KG_UI.getLabWorldState();
        if (!l.unlocked) {
          this.lockedText = `Labor gesperrt: ${l.bedsWithHarvest}/${l.requiredBeds} Beete mit Ernte.`;
          this.lockedTextUntil = Date.now() + 1800;
          return;
        }
      }
      this.lockedText = "";
      window.KG_UI.openFromWorld({ section: zone.section, bedId: zone.bedId || null });
    }

    updatePrompt(text) {
      if (promptEl) promptEl.textContent = text;
    }

    renderPrompt() {
      if (this.lockedText) {
        this.updatePrompt(this.lockedText);
        return;
      }
      if (!this.activeZone) {
        this.updatePrompt("Bewege dich mit WASD/Pfeiltasten. Bei Zone: [E] nutzen.");
        return;
      }
      if (this.activeZone.id === "combat") {
        const c = window.KG_UI.getCombatWorldState();
        if (!c.hasActiveBed) {
          this.updatePrompt("Kampf gesperrt: Zuerst im Seed-Menue ein Beet wählen.");
          return;
        }
        if (!c.combatUnlocked) {
          this.updatePrompt("Kampf gesperrt: Ernte erst alle Pflanzen im aktiven Beet.");
          return;
        }
        const bossPart = c.bossReady ? " | Boss bereit" : "";
        this.updatePrompt(`[E] Kampf starten | Früchte: ${c.fruits}${bossPart}`);
        return;
      }
      if (this.activeZone.id === "lab") {
        const l = window.KG_UI.getLabWorldState();
        if (!l.unlocked) {
          this.updatePrompt(`Labor gesperrt: ${l.bedsWithHarvest}/${l.requiredBeds} Beete mit Ernte.`);
          return;
        }
        this.updatePrompt("[E] Labor öffnen");
        return;
      }
      this.updatePrompt(`[E] ${this.activeZone.label} öffnen`);
    }
  }

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: "phaser-game",
    width: 960,
    height: 540,
    backgroundColor: "#d9ead9",
    physics: {
      default: "arcade",
      arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [WorldScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  });
})();

