export type Progress = {
    score: number;
    attempt: number;
    correct_attempt: number;
    no_of_problem: {
        easy: 0,
        medium: 0,
        hard: 0,
    };
};