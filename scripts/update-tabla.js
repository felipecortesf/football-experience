// scripts/update-tabla.js
// Descarga la clasificacion actual del Brasileirao Serie A (fuente: ge.globo.com,
// via el paquete campeonato-brasileiro-api) y la guarda como data/tabla.json
// para que equipo.html la consuma con un simple fetch, sin depender de la
// API de pago ni del widget de API-Sports.

const fs = require("fs");
const path = require("path");
const brasileirao = require("campeonato-brasileiro-api");

async function main() {
  const table = await brasileirao.getTable("a");

  const equipos = table.entries.map((e) => ({
    posicion: e.position,
    equipo: e.team.name,
    sigla: e.team.shortName,
    escudo: e.team.badge,
    puntos: e.points,
    jugados: e.matches,
    ganados: e.wins,
    empatados: e.draws,
    perdidos: e.losses,
    golesFavor: e.goalsFor,
    golesContra: e.goalsAgainst,
    diferencia: e.goalDifference,
    forma: e.recentForm || [],
  }));

  const salida = {
    competencia: "Brasileirao Serie A",
    rodada: table.round ? table.round.number : null,
    rodadaTotal: table.round ? table.round.total : null,
    actualizadoEn: new Date().toISOString(),
    fuente: "ge.globo.com (via campeonato-brasileiro-api)",
    equipos,
  };

  const outDir = path.join(__dirname, "..", "data");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "tabla.json"),
    JSON.stringify(salida, null, 2)
  );

  console.log(
    `tabla.json actualizada: ${equipos.length} equipos, rodada ${salida.rodada}/${salida.rodadaTotal}`
  );
}

main().catch((err) => {
  console.error("Error actualizando tabla.json:", err.message);
  process.exit(1);
});
