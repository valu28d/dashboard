import { useState } from 'react';
import { CohereAssistant } from '../utils/CohereAssistant';

export const useCohere = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const assistant = new CohereAssistant();

    const askAssistant = async (question: string, context: string) => {
        setLoading(true);
        setError(null);
        try {
            const reply = await assistant.getResponse(question, context);
            setResponse(reply);
        } catch (err) {
            setError('No se pudo conectar con el asistente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, response, error, askAssistant };
};
