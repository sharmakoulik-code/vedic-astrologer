import React from 'react';
import type { BirthChart } from '../../utils/chart';
import { PLANET_ORDER, formatDegree } from '../../utils/kundliLayout';
import { KUNDLI_LABELS } from './labels';

export const PlanetTable: React.FC<{ chart: BirthChart; showHouses: boolean }> = ({ chart, showHouses }) => {
  const lagnaLongitude = chart.lagnaLongitude;
  return (
    <div className="overflow-x-auto">
      <table className="kundli-table w-full text-left text-sm">
        <caption className="sr-only">{KUNDLI_LABELS.planetTableCaption}</caption>
        <thead>
          <tr>
            <th scope="col">{KUNDLI_LABELS.colPlanet}</th>
            <th scope="col">{KUNDLI_LABELS.colSign}</th>
            <th scope="col">{KUNDLI_LABELS.colDegree}</th>
            <th scope="col">{KUNDLI_LABELS.colNakshatra}</th>
            {showHouses && <th scope="col">{KUNDLI_LABELS.colHouse}</th>}
          </tr>
        </thead>
        <tbody>
          {showHouses && chart.lagna && lagnaLongitude !== null && (
            <tr>
              <th scope="row">{KUNDLI_LABELS.ascendantFull}</th>
              <td>{chart.lagna}</td>
              <td>{formatDegree(lagnaLongitude % 30)}</td>
              <td>–</td>
              <td>1</td>
            </tr>
          )}
          {PLANET_ORDER.map((name) => {
            const planet = chart.planets[name];
            return (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{planet.sign}</td>
                <td>{formatDegree(planet.degree)}</td>
                <td>{planet.nakshatra} ({planet.pada})</td>
                {showHouses && <td>{planet.house ?? '–'}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
