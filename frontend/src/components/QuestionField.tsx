import { useFormContext, useFieldArray } from 'react-hook-form';
import type { QuestionType } from '../types/quiz';
import styles from './QuestionField.module.css';

interface QuestionFieldProps {
    index: number;
    onRemove: () => void;
}

const questionTypes: { value: QuestionType; label: string }[] = [
    { value: 'BOOLEAN', label: 'True / False' },
    { value: 'INPUT', label: 'Text Input' },
    { value: 'CHECKBOX', label: 'Multiple Choice' },
];

export default function QuestionField({ index, onRemove }: QuestionFieldProps) {
    const { register, watch, control, formState: { errors } } = useFormContext();

    const type = watch(`questions.${index}.type`) as QuestionType;

    // manage options array for CHECKBOX questions
    const { fields: optionFields, append: addOption, remove: removeOption } =
        useFieldArray({ control, name: `questions.${index}.options` });

    const questionErrors = errors.questions as Record<string, any> | undefined;
    const fieldErrors = questionErrors?.[index];

    return (
        <div className={styles.question}>
            <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>Question {index + 1}</span>
                <button type="button" className={styles.removeBtn} onClick={onRemove}>
                    Remove
                </button>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Question Text</label>
                <input
                    {...register(`questions.${index}.text`)}
                    className={styles.input}
                    placeholder="Enter your question..."
                />
                {fieldErrors?.text && (
                    <span className={styles.error}>{fieldErrors.text.message}</span>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Type</label>
                <select
                    {...register(`questions.${index}.type`)}
                    className={styles.select}
                >
                    {questionTypes.map((qt) => (
                        <option key={qt.value} value={qt.value}>
                            {qt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Boolean — two fixed options */}
            {type === 'BOOLEAN' && (
                <div className={styles.field}>
                    <label className={styles.label}>Correct Answer</label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="true"
                                {...register(`questions.${index}.booleanAnswer`)}
                            />
                            True
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="false"
                                {...register(`questions.${index}.booleanAnswer`)}
                            />
                            False
                        </label>
                    </div>
                </div>
            )}

            {/* Input — text field for the correct answer */}
            {type === 'INPUT' && (
                <div className={styles.field}>
                    <label className={styles.label}>Correct Answer</label>
                    <input
                        {...register(`questions.${index}.correctAnswer`)}
                        className={styles.input}
                        placeholder="Enter the correct answer..."
                    />
                    {fieldErrors?.correctAnswer && (
                        <span className={styles.error}>{fieldErrors.correctAnswer.message}</span>
                    )}
                </div>
            )}

            {/* Checkbox — dynamic list of options */}
            {type === 'CHECKBOX' && (
                <div className={styles.field}>
                    <label className={styles.label}>Options</label>
                    <div className={styles.optionsList}>
                        {optionFields.map((optField, optIdx) => (
                            <div key={optField.id} className={styles.optionRow}>
                                <input
                                    type="checkbox"
                                    {...register(`questions.${index}.options.${optIdx}.isCorrect`)}
                                    className={styles.checkbox}
                                />
                                <input
                                    {...register(`questions.${index}.options.${optIdx}.text`)}
                                    className={styles.optionInput}
                                    placeholder={`Option ${optIdx + 1}`}
                                />
                                <button
                                    type="button"
                                    className={styles.removeOptionBtn}
                                    onClick={() => removeOption(optIdx)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className={styles.addOptionBtn}
                        onClick={() => addOption({ text: '', isCorrect: false })}
                    >
                        + Add Option
                    </button>
                </div>
            )}
        </div>
    );
}
