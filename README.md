# Coding Challenge

## The Problem

Write a service to collect scores and report progress on a game of tennis. The problem is broken into stages.

**Scoring Games**

Games are scored as follows:

games start at at "love" (or zero) and go up to 40, but that's actually just four points.

From love, the first point is 15, then 30, then 40, then game point.

If a player loses when on game point the score reverts to deuce (40 all)

The game continues until a player wins when on game point.

**Scoring Sets**

To complete a set, someone must win six games; the first person to win six games wins the set

As with games - to win a set a player must win by two games.

If the score gets to 6 games all a tie breaker is played.

In a tie breaker:

players start at 0

points are scored in single increments

first payer to win 7 points or more and be ahead by 2 points wins the set.

**The API**

The service should be able to:

create a new game between two players

process points for a given game

report on the current score of a game.

The service does not need to persist data across restarts. Some indicative payloads are below.

**Create a game**

```
{
    "name": "Feder vs Nadal",
    "players" : {
        "p1" : "Federer",
        "p2" : "Nadal"
    },
}
```

**Record a point**

```
{
    gameId: 1234,
    point: "p1"
}
```

**Request Score**

```
{
    gameId: 1234,
    name: "Feder vs Nadal",
    sets: [
        { p1: 6, p2: 4 },
        { p1: 1, p2: 2 }
    ],
    currentGame : {
        p1 : 30,
        p2: 40
    }
}
```

Define the service using whatever API and toolkits you feel comfortable with.
