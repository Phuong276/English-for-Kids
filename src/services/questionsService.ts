import { questionRepo } from "../repos/questionsRepo";

export const questionsService = {
  findQuestionsByIdRound: async (
    pageSize: number,
    pageIndex: number,
    idRound: number
  ) => {
    return await questionRepo.findQiestionsByIdRound(pageSize, pageIndex, idRound);
  },
};
