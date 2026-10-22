import { useState } from 'react';

type ReplayState = {
  runs: number;
  stored: number;
  duplicates: number;
  status: string;
};

const INITIAL: ReplayState = {
  runs: 0,
  stored: 0,
  duplicates: 0,
  status: 'Nothing has been imported yet.',
};

/**
 * A local demonstration of an idempotent import. It is deliberately inert:
 * no network, no customer data, and no claim to be a live EnkaAI trace.
 */
export function ImportReplay() {
  const [state, setState] = useState<ReplayState>(INITIAL);

  const runImport = () => {
    setState((previous) => {
      const runs = previous.runs + 1;
      return {
        runs,
        stored: 1,
        duplicates: 0,
        status:
          runs === 1
            ? 'First run: one row stored under the source key.'
            : 'Replay: the source key matched the stored row, so it was updated in place. No duplicate was created.',
      };
    });
  };

  return (
    <div className="replay" data-ui>
      <div className="replay__intro">
        <h3 className="replay__title">One import, run twice</h3>
        <p className="replay__note">
          A local demonstration of the rule above. No network, no customer data, no live system.
        </p>
      </div>

      <div className="replay__panel">
        <div className="replay__record">
          <p className="replay__label">Illustrative source record</p>
          <dl>
            <div>
              <dt>Source key</dt>
              <dd>invoice:DEMO-1042</dd>
            </div>
            <div>
              <dt>Supplier</dt>
              <dd>Demonstration supplier</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>KES 7,500</dd>
            </div>
          </dl>
        </div>

        <div className="replay__stats">
          <div>
            <span>Imports run</span>
            <strong>{state.runs}</strong>
          </div>
          <div>
            <span>Rows stored</span>
            <strong>{state.stored}</strong>
          </div>
          <div>
            <span>Duplicate rows</span>
            <strong>{state.duplicates}</strong>
          </div>
        </div>

        <p className="replay__status" aria-live="polite">
          {state.status}
        </p>

        <div className="replay__actions">
          <button type="button" className="replay__button" onClick={runImport}>
            {state.runs === 0 ? 'Run the import' : 'Run it again'}
          </button>
          {state.runs > 0 && (
            <button
              type="button"
              className="replay__reset"
              onClick={() => setState(INITIAL)}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
