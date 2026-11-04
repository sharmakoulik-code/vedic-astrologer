import React from 'react';
import type { BirthChart } from '../../utils/chart';
import { formatReportDate } from '../../utils/reportFormatting';
import { KUNDLI_LABELS } from './labels';

export const DashaTable: React.FC<{ chart: BirthChart }> = ({ chart }) => (
  <div>
    <div className="overflow-x-auto">
      <table className="kundli-table w-full text-left text-sm">
        <caption className="sr-only">{KUNDLI_LABELS.dashaCaption}</caption>
        <thead>
          <tr>
            <th scope="col">{KUNDLI_LABELS.colLord}</th>
            <th scope="col">{KUNDLI_LABELS.colStart}</th>
            <th scope="col">{KUNDLI_LABELS.colEnd}</th>
          </tr>
        </thead>
        <tbody>
          {chart.dasha.nextMahadasha.map((period) => {
            const isCurrent = period.lord === chart.dasha.currentMahadasha;
            return (
              <tr key={`${period.lord}-${period.start}`} className={isCurrent ? 'kundli-current-row' : undefined}>
                <th scope="row">
                  {period.lord}
                  {isCurrent && <span className="kundli-badge">{KUNDLI_LABELS.currentBadge}</span>}
                </th>
                <td>{formatReportDate(period.start)}</td>
                <td>{formatReportDate(period.end)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <p className="text-premium-muted mt-4">
      {KUNDLI_LABELS.currentAntardasha}: <strong>{chart.dasha.currentMahadasha} / {chart.dasha.currentAntardasha}</strong>
    </p>
  </div>
);
