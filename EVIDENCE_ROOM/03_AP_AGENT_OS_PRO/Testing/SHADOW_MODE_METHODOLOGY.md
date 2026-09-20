# Shadow Mode Methodology

## Purpose
Run agent alongside human process without granting action permissions. Compare outputs.

## Duration
Minimum 2 weeks. Recommended 4 weeks for high-volume agents.

## Setup
1. Agent configured at Level 0 (Observe) with output logging
2. Parallel human process continues unchanged
3. Comparison framework established

## Daily Activities
- Agent processes all items in scope
- Human processes all items independently
- Divergence log maintained

## Comparison Metrics
| Metric | Target |
|--------|--------|
| Agreement rate | >85% to progress to Level 1 |
| Material divergence rate | <5% |
| False positive rate | <5% |
| Coverage | 100% of items in scope |

## Divergence Investigation
Every material divergence investigated:
- Agent correct, human incorrect → document learning
- Human correct, agent incorrect → improve agent, do not progress
- Ambiguous → escalate to human owner

## Exit Criteria
- Agreement rate meets threshold for 2+ consecutive weeks
- All material divergences investigated and resolved
- Human owner sign-off
- Control review complete
