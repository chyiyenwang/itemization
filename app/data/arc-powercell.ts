const item = {
  id: "arc-powercell",
  name: "ARC Powercell",
  description:
    "Valuable resource that drops from all ARC enemies. Used to craft: Shield Recharger",
  item_type: "Topside Material",
  loadout_slots: ["backpack", "safePocket"],
  icon: "https://cdn.metaforge.app/arc-raiders/icons/arc-powercell.webp",
  rarity: "Common",
  value: 270,
  workbench: null,
  stat_block: {
    range: 0,
    damage: 0,
    health: 0,
    radius: 0,
    shield: 0,
    weight: 0.5,
    agility: 0,
    arcStun: 0,
    healing: 0,
    stamina: 0,
    stealth: 0,
    useTime: 3,
    duration: 10,
    fireRate: 0,
    stability: 0,
    stackSize: 5,
    damageMult: 0,
    raiderStun: 0,
    weightLimit: 0,
    augmentSlots: 0,
    healingSlots: 0,
    magazineSize: 0,
    reducedNoise: 0,
    shieldCharge: 0,
    backpackSlots: 0,
    quickUseSlots: 0,
    damagePerSecond: 0,
    movementPenalty: 0,
    safePocketSlots: 0,
    damageMitigation: 0,
    healingPerSecond: 0,
    reducedEquipTime: 0,
    staminaPerSecond: 0,
    increasedADSSpeed: 0,
    increasedFireRate: 0,
    reducedReloadTime: 0,
    illuminationRadius: 0,
    increasedEquipTime: 0,
    reducedUnequipTime: 0,
    shieldCompatibility: "",
    increasedUnequipTime: 0,
    reducedVerticalRecoil: 0,
    increasedBulletVelocity: 0,
    increasedVerticalRecoil: 0,
    reducedMaxShotDispersion: 0,
    reducedPerShotDispersion: 0,
    reducedDurabilityBurnRate: 0,
    reducedRecoilRecoveryTime: 0,
    increasedRecoilRecoveryTime: 0,
    reducedDispersionRecoveryTime: 0,
  },
  flavor_text: null,
  subcategory: null,
  created_at: "2025-09-23T18:21:03.51415+00:00",
  updated_at: "2026-01-31T06:29:13.011643+00:00",
  shield_type: null,
  loot_area: "ARC",
  sources: null,
  ammo_type: null,
  locations: [],
  guide_links: [],
  game_asset_id: -9999,
  components: [],
  used_in: [
    {
      item: {
        id: "shield-recharger",
        icon: "https://cdn.metaforge.app/arc-raiders/icons/shield-recharger.webp",
        name: "Shield Recharger",
        rarity: "Uncommon",
        item_type: "Quick Use",
        description: "A handheld repair kit that recharges a shield on use.",
      },
      quantity: 1,
    },
  ],
  recycle_components: [],
  recycle_from: [
    {
      item: {
        id: "advanced-arc-powercell",
        icon: "https://cdn.metaforge.app/arc-raiders/icons/advanced-arc-powercell.webp",
        name: "Advanced ARC Powercell",
        rarity: "Rare",
        item_type: "Topside Material",
        description:
          "Very valuable resource that drops from certain ARC enemies",
      },
      quantity: 2,
    },
  ],
  mods: [],
  dropped_by: [
    {
      id: "09615860-43e8-4535-b3dc-7e499451fe46",
      arc: {
        id: "hornet",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/hornet.webp",
        name: "Hornet",
        description:
          "This is a medium-class drone, easily recognizable by the pair of armored rotors mounted prominently on its front. It rarely operates alone, preferring to patrol the skies alongside a swarm of Wasps or to act as an aerial shield for a larger, ground-based ARC. Its main attack is a focused, high-speed projectile. Watch for the brief, one-second pulse of a red aiming laser—that's your warning before it fires a specialized stun round designed to shred Raider shields and tear through light armor almost instantly.",
      },
      arc_id: "hornet",
      created_at: "2025-11-04T15:57:35.118713+00:00",
    },
    {
      id: "ec1a5aa4-bd9c-4d23-8ac6-b80295a9ddf5",
      arc: {
        id: "bison",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/bison.webp",
        name: "Leaper",
        description:
          "This isn't just an ARC; it's a massive, arachnid-like siege engine. Its heavy armor gives it a hulking, near-indestructible presence on the battlefield, but don't mistake its bulk for sluggishness. This mechanized spider possesses an unnerving, gravity-defying ability to leap vast distances. Reports confirm it has been seen clearing impossible gaps, even bounding effortlessly to the summit of a Spaceport tower. It's a vertical threat you can't simply hide from.",
      },
      arc_id: "bison",
      created_at: "2025-11-04T15:59:19.422889+00:00",
    },
    {
      id: "2357638b-bd34-4d07-96f7-dd2d8e04e717",
      arc: {
        id: "rocketeer",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/rocketeer.webp",
        name: "Rocketeer",
        description:
          "This is a formidable flying ARC, a pure engine of destruction that dominates the airspace. It poses a significant threat not just because it flies, but because of its powerful rocket attacks and devastating focus on area-of-effect (AoE) damage. This unit is designed to saturate an area, turning cover into a liability and forcing Raiders to constantly relocate or be wiped out by the sheer force of its explosions. Treat it like a mobile artillery piece—it hits hard and wide.",
      },
      arc_id: "rocketeer",
      created_at: "2025-11-04T16:34:18.669309+00:00",
    },
    {
      id: "b627b142-c1a5-4763-bf4d-3ab03982551a",
      arc: {
        id: "pop",
        icon: "https://cdn.metaforge.app/arc-raiders/icons/pop.webp",
        name: "Pop",
        description:
          "The Pop is a small, unarmored rolling machine. It's a quick, impulsive enemy that often roams in swarms. Often found indoors, the Pop's purpose is thought to be clearing out rubble and blockages that may inhibit ARC's operations. The Pop seems to have little regard for its own safety; carrying an explosive charge that \"pops\" upon impact, scorching any Raider that lets it get too close.",
      },
      arc_id: "pop",
      created_at: "2025-12-09T19:55:04.43944+00:00",
    },
    {
      id: "8c9849fa-e2ef-45f3-8b13-b7ef425c5af9",
      arc: {
        id: "wasp",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/wasp.webp",
        name: "Wasp",
        description:
          "This is the Wasp, a baseline enemy drone that poses a threat through sheer numbers. It is a small, unarmored flyer that peppers Raiders with light-caliber ammunition. You'll almost never encounter a Wasp alone; they operate in tight patrols alongside other Wasps or as escorts for their more dangerous counterpart, the Hornet. The moment it turns aggressive, look for a small red laser to lock onto you for one second—that's your cue to dodge before it unleashes a quick 1.5-second burst of gunfire.",
      },
      arc_id: "wasp",
      created_at: "2025-11-04T00:46:26.731323+00:00",
    },
    {
      id: "1e0cd1fd-f2cd-4cc2-b3ab-633315ade89f",
      arc: {
        id: "bastion",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/bastion.webp",
        name: "Bastion",
        description:
          "A massive, heavily armored ARC unit, built around a terrifying, fully automatic minigun. It rarely moves without air support overhead, which helps it pin down and suppress Raider movement. Listen for its loud, distinct screech—that's your warning before it unleashes a three-second hail of bullets toward the last known enemy position.",
      },
      arc_id: "bastion",
      created_at: "2025-11-04T15:53:56.825634+00:00",
    },
    {
      id: "4a012c4f-eb0a-4a7d-8d6b-38d8f09a5cd3",
      arc: {
        id: "bombardier",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/bombardier.webp",
        name: "Bombardier",
        description:
          "The Bombardier is an armored ARC that functions as heavy, mobile artillery. Its movement is slow and loud. Armed with a multi-rocket launcher, it unleashes devastating, long-range barrages that can obliterate your entire squad. Do not engage this unit. If you hear its grinding approach, silence your movement and escape the area immediately, as its attention is a death sentence.",
      },
      arc_id: "bombardier",
      created_at: "2025-11-04T15:56:37.290049+00:00",
    },
    {
      id: "f0753d6e-2655-42fe-bcf8-530e49a99fa2",
      arc: {
        id: "snitch",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/snitch.webp",
        name: "Snitch",
        description:
          "This little flyer is a swift and unarmored scout drone, often identifiable by its cluster of three rotors. While individually fragile, its primary danger is its role as an aerial alarm system. Once it spots Raiders, it immediately triggers a wide-band signal, effectively calling in a wave of flying ARC reinforcements—usually a swarm of Wasps or Hornets—to descend on your position. Taking it out before it completes its transmission is essential, as its light frame means a single, well-aimed burst will shatter it.",
      },
      arc_id: "snitch",
      created_at: "2025-11-04T16:36:02.882962+00:00",
    },
    {
      id: "b82caf67-c9b0-4a4a-9c52-69e50e49476f",
      arc: {
        id: "shredder",
        icon: "https://cdn.metaforge.app/arc-raiders/icons/shredder.webp",
        name: "Shredder",
        description:
          'When this relentless lump of menace was first encountered at the Stella Montis facility, it left behind a trail of downed Raiders. It was dubbed the "Shredder" by what few Raiders managed to get back to safety; a name that wasn\'t so much clever as it was painfully literal.',
      },
      arc_id: "shredder",
      created_at: "2025-11-14T18:52:50.636795+00:00",
    },
    {
      id: "c0e485b8-f23e-4f00-bd76-747b5b710157",
      arc: {
        id: "rollbot",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/rollbot.webp",
        name: "Surveyor",
        description:
          "This is the largest of the rolling ARCs, a massive, spherical construct designed to dominate open ground. Its primary tactic is to stop periodically on the battlefield to transmit disruptive signals, acting as a massive relay for the ARC network. Be warned, however, its most unique (and dangerous) trait is its resilience: as it takes damage, its outer shell breaks apart into many smaller, armored pieces. Its final attack is a relentless one: it will roll directly at high speed toward any Raider it detects, essentially turning itself into a giant, high-impact bowling ball.",
      },
      arc_id: "rollbot",
      created_at: "2025-12-09T15:28:04.703126+00:00",
    },
    {
      id: "716a1763-69b5-47fa-be11-2dac6e42ec3c",
      arc: {
        id: "fireball",
        icon: "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/fireball.webp",
        name: "Fireball",
        description:
          "A small armored rolling ARC that spits flame. Will open up it's front panel when near Raiders to burn them alive. While the front is open its soft unarmored core is exposed.",
      },
      arc_id: "fireball",
      created_at: "2025-12-09T19:56:32.267972+00:00",
    },
    {
      id: "5b6b8071-017e-433c-afb9-7c774bbbcbdd",
      arc: {
        id: "spotter",
        icon: "https://cdn.metaforge.app/arc-raiders/icons/spotter.webp",
        name: "Spotter",
        description:
          "Often compared to the Snitch, the Spotter reconnaissance drone patrols and scans for Raiders. While it does not call in reinforcements directly, it does make a lot of fuss while relaying Raider positions to other ARC machines.\n\nDespite its size, the Spotter can take considerable punishment. Combined with its unpredictable flight patterns, it's a frustrating opponent to pin down.\n\nHunting Spotters creates commotion and might draw the attention of oportunistic Raiders looking to eliminate the competition.",
      },
      arc_id: "spotter",
      created_at: "2026-01-19T22:55:47.925108+00:00",
    },
  ],
  sold_by: [],
};

export default item;
