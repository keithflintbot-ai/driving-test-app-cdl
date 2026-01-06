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
        -p "You are working through a PRD (Product Requirements Document).

FILES PROVIDED:
- prd.json: List of tasks with 'passes' boolean flags
- progress.txt: Log of previous work (append your learnings here)

INSTRUCTIONS:
1. Find the highest priority task that has passes: false
   - Priority is YOUR judgment, not necessarily first in list
   - Consider dependencies between tasks

2. Work on ONLY that ONE task
   - Keep changes focused and small
   - Run any verification steps needed

3. When the task is complete:
   - Update prd.json marking the task as passes: true
   - Append a brief note to progress.txt about what you did
   - Make a git commit with a descriptive message

4. If ALL tasks in prd.json have passes: true, output:
   <promise>COMPLETE</promise>

IMPORTANT:
- Only work on ONE task per iteration
- Commit after completing each task
- Keep progress.txt notes brief but useful for future iterations")

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
