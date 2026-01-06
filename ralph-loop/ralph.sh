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

    # Each iteration is a FRESH context - Claude only knows what's in these files
    OUTPUT=$(claude --print \
        "$SCRIPT_DIR/prd.json" \
        "$SCRIPT_DIR/progress.txt" \
        -p "You are working through a PRD with tasks and rules.

## STEP 1: READ THE FILES
- prd.json contains:
  - 'rules': 18 rules ALL questions must follow
  - 'tasks': List of tasks with passes: true/false
  - 'output_format': How to structure the JSON output
- progress.txt contains notes from previous iterations (your memory)

## STEP 2: PICK ONE TASK
- Find a task where passes: false
- Choose based on priority/dependencies (not just first in list)
- Work on ONLY that ONE task

## STEP 3: DO THE WORK
- Follow ALL 18 rules in prd.json
- Use web search to verify facts
- Save output to the specified file

## STEP 4: VERIFY AGAINST ALL 18 RULES
Before marking complete, check every rule:
- Rules 1-4: No dollars, insurance formats, points, jail times
- Rules 5-6: No duplicates, max 3 per concept
- Rules 7-9: Answer length balance, no giveaways, A/B/C/D distribution
- Rules 10-13: Format (?, all fields, index match, AM/PM)
- Rules 14-15: Style (no stem repetition, similar lengths)
- Rules 16-18: Accuracy (spelling, verified facts, universal truth)

## STEP 5: UPDATE FILES
- Update prd.json: Set passes: true for completed task
- Append to progress.txt: Brief notes on what you did, what you learned
- Make a git commit

## STEP 6: CHECK IF DONE
If ALL tasks have passes: true, output exactly:
<promise>COMPLETE</promise>

IMPORTANT: Each iteration is a fresh context. progress.txt is your only memory between iterations.")

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
echo "Check prd.json for remaining tasks"
echo "============================================"
