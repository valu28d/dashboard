import { CohereClient } from "cohere-ai";

export class CohereAssistant {
    private client: CohereClient;

    constructor() {
        this.client = new CohereClient({
            token: "lt7VlkUtOM403xXRSqH0J2GLUj76BNPXKAOCMq0P",
        });
    }

    async getResponse(message: string, context: string): Promise<string> {
        try {
            const chatStream = await this.client.chat({
                message: `Contexto del clima actual: ${context}. Pregunta del usuario: ${message}. Responde de manera concisa y útil sobre el clima.`,
                temperature: 0.3,
            });

            return chatStream.text;
        } catch (error) {
            console.error("Error calling Cohere:", error);
            return "Lo siento, tuve un problema al consultar mi red neuronal.";
        }
    }
}
