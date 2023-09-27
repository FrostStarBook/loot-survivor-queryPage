# loot-survivor-queryPage

Use checkPoint to collect data, provide multidimensional data query for adventurers

To-do list
- Integrate checkPoint and collect data ✅
- Collect data through full event listening
    - [x] StartGame: StartGame,
    - [x] UpgradesAvailable: UpgradesAvailable,
    - [x] DiscoveredHealth: DiscoveredHealth,
    - [x] DiscoveredGold: DiscoveredGold,
    - [x] DodgedObstacle: DodgedObstacle,
    - [x] HitByObstacle: HitByObstacle,
    - [x] AmbushedByBeast: AmbushedByBeast,
    - [ ] DiscoveredBeast: DiscoveredBeast,
    - [ ] AttackedBeast: AttackedBeast,
    - [ ] AttackedByBeast: AttackedByBeast,
    - [x] SlayedBeast: SlayedBeast,
    - [ ] FleeFailed: FleeFailed,
    - [ ] FleeSucceeded: FleeSucceeded,
    - [x] AdventurerLeveledUp: AdventurerLeveledUp,
    - [ ] PurchasedItems: PurchasedItems,
    - [ ] PurchasedPotions: PurchasedPotions,
    - [ ] AdventurerUpgraded: AdventurerUpgraded,
    - [ ] EquippedItems: EquippedItems,
    - [ ] DroppedItems: DroppedItems,
    - [ ] ItemsLeveledUp: ItemsLeveledUp,
    - [ ] AdventurerDied: AdventurerDied,
    - [ ] NewHighScore: NewHighScore,
    - [ ] IdleDeathPenalty: IdleDeathPenalty,
    - [x] RewardDistribution: RewardDistribution
- Total number of adventurers (total alive, total dead)
- Number of plays from the same address
- Specified adventurer's gameplay path


## How to get started

Add a .env configuration file to the project root directory.
```
DATABASE_URL=mysql://root:default_password@localhost:3306/checkpoint
```

[View Documentation](https://github.com/FrostStarBook/loot-survivor-queryPage/tree/master/src/doc)