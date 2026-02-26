export function PushupTracker() {
  return (
    <div className="pushup-tracker">
      <div className="pt-header">
        <h3>100 Push-Up Roadmap</h3>
        <span>Your current baseline: 4×25</span>
      </div>
      <div className="pt-body">
        <div className="pt-phases">
          <div className="pt-phase">
            <h4>Weeks 1–2</h4>
            <ul>
              <li>Nail 4×25 every Monday &amp; Friday</li>
              <li>2×20 on Tu/Thu mornings</li>
              <li>Slow tempo = strength base</li>
            </ul>
          </div>
          <div className="pt-phase">
            <h4>Weeks 3–4</h4>
            <ul>
              <li>Test max unbroken (Fri W3 &amp; W4)</li>
              <li>Target: 50–65+ unbroken</li>
              <li>&quot;Grease the groove&quot; daily habit</li>
            </ul>
          </div>
          <div className="pt-phase">
            <h4>Block 2 (Weeks 5–8)</h4>
            <ul>
              <li>Add decline push-ups for upper chest</li>
              <li>Target: 80 unbroken by end</li>
              <li>Begin pyramid sets (1-2-3-4…)</li>
            </ul>
          </div>
          <div className="pt-phase">
            <h4>Block 3 (Weeks 9–12)</h4>
            <ul>
              <li>Weighted vest push-ups (optional)</li>
              <li>100 unbroken push-up attempt</li>
              <li>You&apos;ll be ready.</li>
            </ul>
          </div>
        </div>
        <div className="pt-today">
          <strong>Key tip:</strong> &quot;Greasing the groove&quot; — do 10
          push-ups every time you get up from your desk. On a WFH day,
          that&apos;s an easy extra 50–80 reps without a workout.
        </div>
      </div>
    </div>
  );
}
