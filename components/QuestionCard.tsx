import { Question } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerChange,
  showResult = false,
}: QuestionCardProps) {
  const options = [
    { value: "A", label: question.optionA },
    { value: "B", label: question.optionB },
    { value: "C", label: question.optionC },
    { value: "D", label: question.optionD },
  ];

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </div>
          <Badge variant="outline">{question.category}</Badge>
        </div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
          <div className="space-y-3">
            {options.map((option) => {
              const isThisCorrect = option.value === question.correctAnswer;
              const isSelected = selectedAnswer === option.value;

              let itemClassName = "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors";

              if (showResult) {
                if (isThisCorrect) {
                  itemClassName += " bg-green-50 border-green-500";
                } else if (isSelected && !isCorrect) {
                  itemClassName += " bg-red-50 border-red-500";
                }
              }

              return (
                <div key={option.value} className={itemClassName}>
                  <RadioGroupItem
                    value={option.value}
                    id={`option-${option.value}`}
                    disabled={showResult}
                  />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    <span className="font-semibold mr-2">{option.value}.</span>
                    {option.label}
                  </Label>
                  {showResult && isThisCorrect && (
                    <Badge className="bg-green-500">Correct</Badge>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <Badge className="bg-red-500">Wrong</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </RadioGroup>

        {showResult && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Explanation:</div>
            <div className="text-blue-800">{question.explanation}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
