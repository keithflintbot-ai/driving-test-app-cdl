#!/bin/bash
set -e

# Ralph Loop - Run coding agent in a loop until PRD is complete
# Usage: ./ralph.sh <max_iterations>
# Example: ./ralph.sh 10

MAX_ITERATIONS=${1:?Please provide max iterations as first argument}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo ""
    echo "============================================"
    echo "Ralph Loop - Iteration $i of $MAX_ITERATIONS"
    echo "============================================"
    echo ""

    OUTPUT=$(claude --print \
        "$SCRIPT_DIR/prd.json" \
        "$SCRIPT_DIR/progress.txt" \
        -p "You are working through a PRD with tasks and rules.

READ THESE FILES:
- prd.json: Contains rules_checklist (18 rules), workflow, tasks, output_format
- progress.txt: Your notes from previous iterations

WORKFLOW FOR GENERATING QUESTIONS:
1. Pick ONE task with passes: false
2. For that task, generate questions ONE AT A TIME:

   Loop for each question:
   ┌─────────────────────────────────┐
   │ Generate question N             │
   └───────────────┬─────────────────┘
                   ▼
   ┌─────────────────────────────────┐
   │ Check ALL 18 rules:             │
   │ □ 1. No dollar amounts?         │
   │ □ 2. No insurance format?       │
   │ □ 3. No point values?           │
   │ □ 4. No jail times?             │
   │ □ 5. Not >80% similar to prev?  │
   │ □ 6. <3 questions on concept?   │
   │ □ 7. Answer length balanced?    │
   │ □ 8. No always/never giveaway?  │
   │ □ 9. Tracking A/B/C/D count?    │
   │ □ 10. Ends with ?               │
   │ □ 11. All fields present?       │
   │ □ 12. Index matches letter?     │
   │ □ 13. AM/PM time format?        │
   │ □ 14. Stem not in answers?      │
   │ □ 15. Options similar length?   │
   │ □ 16. Spelling/grammar OK?      │
   │ □ 17. Fact verified (web)?      │
   │ □ 18. Universal (if applies)?   │
   └───────────────┬─────────────────┘
                   ▼
   Pass all 18? → Save question, go to N+1
   Fail any?    → Fix it, re-check

3. After all questions done:
   - Verify A/B/C/D distribution is balanced
   - Update prd.json: passes: true
   - Append notes to progress.txt
   - Git commit

If ALL tasks have passes: true, output:
<promise>COMPLETE</promise>")

    echo "$OUTPUT"

    if [[ "$OUTPUT" == *"<promise>COMPLETE</promise>"* ]]; then
        echo ""
        echo "============================================"
        echo "All PRD tasks complete!"
        echo "============================================"
        exit 0
    fi
done

echo ""
echo "============================================"
echo "Reached max iterations ($MAX_ITERATIONS)"
echo "============================================"
