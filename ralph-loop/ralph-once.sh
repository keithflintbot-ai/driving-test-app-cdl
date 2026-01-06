#!/bin/bash
set -e

# Ralph Once - Single iteration with human in the loop
# Usage: ./ralph-once.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ""
echo "============================================"
echo "Ralph Loop - Single Iteration (Human in Loop)"
echo "============================================"
echo ""

claude \
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
- Keep progress.txt notes brief but useful for future iterations"
