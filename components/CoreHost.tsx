import React from 'react';

// --- Inlined Core Registry and Getter ---
// This logic was previously in `cores/index.ts` but has been moved here
// to resolve a critical dependency on a broken/empty file.

import CorePresentSimple from '../cores/CorePresentSimple';
import CorePresentContinuous from '../cores/CorePresentContinuous';
import CorePresentPerfect from '../cores/CorePresentPerfect';
import CorePresentPerfectContinuous from '../cores/CorePresentPerfectContinuous';
import CorePastSimple from '../cores/CorePastSimple';
import CorePastContinuous from '../cores/CorePastContinuous';
import CorePastPerfect from '../cores/CorePastPerfect';
import CorePastPerfectContinuous from '../cores/CorePastPerfectContinuous';
import CoreFutureSimple from '../cores/CoreFutureSimple';
import CoreBeGoingTo from '../cores/CoreBeGoingTo';
import CoreNearFuturePC from '../cores/CoreNearFuturePC';
import CoreFuturePerfect from '../cores/CoreFuturePerfect';
import CoreFuturePerfectContinuous from '../cores/CoreFuturePerfectContinuous';
import CoreFutureContinuous from '../cores/CoreFutureContinuous';
import CoreSimpleSentence from '../cores/CoreSimpleSentence';
import CoreCompoundSentence from '../cores/CoreCompoundSentence';
import CoreComplexSentence from '../cores/CoreComplexSentence';
import CoreCompoundComplexSentence from '../cores/CoreCompoundComplexSentence';
import CoreCleftSentence from '../cores/CoreCleftSentence';
import CoreConditionalType1 from '../cores/CoreConditionalType1';
import CoreConditionalType2 from '../cores/CoreConditionalType2';
import CoreConditionalType3 from '../cores/CoreConditionalType3';
import CoreConditionalMixed from '../cores/CoreConditionalMixed';
import CoreConditionalInversion1 from '../cores/CoreConditionalInversion1';
import CoreConditionalInversion2 from '../cores/CoreConditionalInversion2';
import CoreConditionalInversion3 from '../cores/CoreConditionalInversion3';
import CoreWishPresent from '../cores/CoreWishPresent';
import CoreWishPast from '../cores/CoreWishPast';
import CoreWishFuture from '../cores/CoreWishFuture';
import CoreReportedStatements from '../cores/CoreReportedStatements';
import CoreReportedYesNoQuestions from '../cores/CoreReportedYesNoQuestions';
import CoreReportedWhQuestions from '../cores/CoreReportedWhQuestions';
import CoreReportedImperatives from '../cores/CoreReportedImperatives';
import CoreReportedRules from '../cores/CoreReportedRules';
import CoreComparisonEquality from '../cores/CoreComparisonEquality';
import CoreComparative from '../cores/CoreComparative';
import CoreSuperlative from '../cores/CoreSuperlative';
import CoreCorrelativeComparison from '../cores/CoreCorrelativeComparison';
import CoreSubjunctiveMandative from '../cores/CoreSubjunctiveMandative';
import CoreSubjunctiveWere from '../cores/CoreSubjunctiveWere';
import CoreSubjunctiveFormulae from '../cores/CoreSubjunctiveFormulae';
import CoreSubjunctiveIt from '../cores/CoreSubjunctiveIt';
import CoreWouldRather from '../cores/CoreWouldRather';
import CoreModalAbility from '../cores/CoreModalAbility';
import CoreModalObligation from '../cores/CoreModalObligation';
import CoreModalPossibility from '../cores/CoreModalPossibility';
import CoreModalDeduction from '../cores/CoreModalDeduction';
import CoreModalAdvice from '../cores/CoreModalAdvice';
import CoreModalHabit from '../cores/CoreModalHabit';
import CoreArticleAAn from '../cores/CoreArticleAAn';
import CoreArticleThe from '../cores/CoreArticleThe';
import CoreArticleZero from '../cores/CoreArticleZero';
import CoreArticleExceptions from '../cores/CoreArticleExceptions';
import CoreAdjectiveOrder from '../cores/CoreAdjectiveOrder';
import CoreAdjectiveEdIng from '../cores/CoreAdjectiveEdIng';
import CoreAdjectivePreposition from '../cores/CoreAdjectivePreposition';
import CoreAdjectiveGradability from '../cores/CoreAdjectiveGradability';
import CoreAdverbTypes from '../cores/CoreAdverbTypes';
import CoreAdverbPosition from '../cores/CoreAdverbPosition';
import CoreAdverbFrequency from '../cores/CoreAdverbFrequency';
import CoreAdverbFocusing from '../cores/CoreAdverbFocusing';
import CoreAdverbComparison from '../cores/CoreAdverbComparison';
import CoreNounCountability from '../cores/CoreNounCountability';
import CoreNounPlural from '../cores/CoreNounPlural';
import CoreNounCompound from '../cores/CoreNounCompound';
import CoreNounPossessive from '../cores/CoreNounPossessive';
import CoreNounPhrase from '../cores/CoreNounPhrase';
import CoreVerbTransitivity from '../cores/CoreVerbTransitivity';
import CoreVerbStative from '../cores/CoreVerbStative';
import CoreVerbPatterns from '../cores/CoreVerbPatterns';
import CorePhrasalVerbs from '../cores/CorePhrasalVerbs';
import CoreCausativeVerbs from '../cores/CoreCausativeVerbs';
import CoreCoordinatingConjunctions from '../cores/CoreCoordinatingConjunctions';
import CoreSubordinatingConjunctions from '../cores/CoreSubordinatingConjunctions';
import CoreCorrelativeConjunctions from '../cores/CoreCorrelativeConjunctions';
import CoreConjunctiveAdverbs from '../cores/CoreConjunctiveAdverbs';
import CoreConjunctionPunctuation from '../cores/CoreConjunctionPunctuation';
import CorePrepositionsOfTime from '../cores/CorePrepositionsOfTime';
import CorePrepositionsOfPlace from '../cores/CorePrepositionsOfPlace';
import CorePrepositionsDependent from '../cores/CorePrepositionsDependent';
import CorePrepositionalPhrases from '../cores/CorePrepositionalPhrases';
import CorePrepositionsEndPosition from '../cores/CorePrepositionsEndPosition';
import CoreRelativeClauseDefining from '../cores/CoreRelativeClauseDefining';
import CoreRelativeClauseNonDefining from '../cores/CoreRelativeClauseNonDefining';
import CoreRelativePronounsOmission from '../cores/CoreRelativePronounsOmission';
import CoreRelativeWhoseWhereWhenWhy from '../cores/CoreRelativeWhoseWhereWhenWhy';
import CoreReducedRelativeVing from '../cores/CoreReducedRelativeVing';
import CoreReducedRelativeVed from '../cores/CoreReducedRelativeVed';
import CoreReducedRelativeTo from '../cores/CoreReducedRelativeTo';
import CoreReducedRelativeWhereWhen from '../cores/CoreReducedRelativeWhereWhen';
import CorePrefixNegative from '../cores/CorePrefixNegative';
import CorePrefixDegree from '../cores/CorePrefixDegree';
import CorePrefixTime from '../cores/CorePrefixTime';
import CorePrefixNumber from '../cores/CorePrefixNumber';
import CoreSuffixNoun from '../cores/CoreSuffixNoun';
import CoreSuffixAdjective from '../cores/CoreSuffixAdjective';
import CoreSuffixVerb from '../cores/CoreSuffixVerb';
import CoreSuffixAdverb from '../cores/CoreSuffixAdverb';
import CorePassivePresentSimple from '../cores/CorePassivePresentSimple';
import CorePassivePresentContinuous from '../cores/CorePassivePresentContinuous';
import CorePassivePresentPerfect from '../cores/CorePassivePresentPerfect';
import CorePassivePresentPerfectContinuous from '../cores/CorePassivePresentPerfectContinuous';
import CorePassivePastSimple from '../cores/CorePassivePastSimple';
import CorePassivePastContinuous from '../cores/CorePassivePastContinuous';
import CorePassivePastPerfect from '../cores/CorePassivePastPerfect';
import CorePassivePastPerfectContinuous from '../cores/CorePassivePastPerfectContinuous';
import CorePassiveFutureSimple from '../cores/CorePassiveFutureSimple';
import CorePassiveBeGoingTo from '../cores/CorePassiveBeGoingTo';
import CorePassiveFutureContinuous from '../cores/CorePassiveFutureContinuous';
import CorePassiveFuturePerfect from '../cores/CorePassiveFuturePerfect';
import CoreAdjectivePositionAttributive from '../cores/CoreAdjectivePositionAttributive';
import CoreAdjectivePositionPredicative from '../cores/CoreAdjectivePositionPredicative';
import CoreAdjectivePosition from '../cores/CoreAdjectivePosition';
import CoreAdjectivePositionComplement from '../cores/CoreAdjectivePositionComplement';
import CoreAdjectivePositionPostpositive from '../cores/CoreAdjectivePositionPostpositive';
import CoreAdverbPositionMid from '../cores/CoreAdverbPositionMid';
import CoreAdverbPositionInitial from '../cores/CoreAdverbPositionInitial';
import CoreAdverbPositionFinal from '../cores/CoreAdverbPositionFinal';
import CoreAdverbPositionInversion from '../cores/CoreAdverbPositionInversion';
import CoreVerbAuxiliaryChain from '../cores/CoreVerbAuxiliaryChain';
import CoreVerbAgreement from '../cores/CoreVerbAgreement';
import CoreVerbNegationQuestions from '../cores/CoreVerbNegationQuestions';
import CoreVerbInversion from '../cores/CoreVerbInversion';
import CoreVerbEllipsis from '../cores/CoreVerbEllipsis';
import CoreNounSubject from '../cores/CoreNounSubject';
import CoreNounObject from '../cores/CoreNounObject';
import CoreNounComplement from '../cores/CoreNounComplement';
import CoreNounApposition from '../cores/CoreNounApposition';
import CoreNounDeterminer from '../cores/CoreNounDeterminer';
import CoreConjCoordination from '../cores/CoreConjCoordination';
import CoreConjSubordination from '../cores/CoreConjSubordination';
import CoreConjCorrelative from '../cores/CoreConjCorrelative';
import CoreConjAdverbs from '../cores/CoreConjAdverbs';
import CoreSentenceAffirmative from '../cores/CoreSentenceAffirmative';
import CoreSentenceNegative from '../cores/CoreSentenceNegative';
import CoreSentenceYesNo from '../cores/CoreSentenceYesNo';
import CoreSentenceWh from '../cores/CoreSentenceWh';
import CoreSentenceImperative from '../cores/CoreSentenceImperative';

const CORE_REGISTRY: Record<string, React.FC | undefined> = {
  T_PRES_SIM:  CorePresentSimple, T_PRES_PROG: CorePresentContinuous, T_PRES_PERF: CorePresentPerfect, T_PRES_PERF_PROG: CorePresentPerfectContinuous, T_PAST_SIM: CorePastSimple,
  T_PAST_PROG: CorePastContinuous, T_PAST_PERF: CorePastPerfect, T_PAST_PERF_PROG: CorePastPerfectContinuous, T_FUT_SIM: CoreFutureSimple, T_FUT_NEAR_BGT: CoreBeGoingTo,
  T_FUT_NEAR_PC: CoreNearFuturePC, T_FUT_PROG: CoreFutureContinuous, T_FUT_PERF: CoreFuturePerfect, T_FUT_PERF_CONT: CoreFuturePerfectContinuous, S_TYPE_SIMPLE: CoreSimpleSentence,
  S_TYPE_COMPOUND: CoreCompoundSentence, S_TYPE_COMPLEX: CoreComplexSentence, S_TYPE_COMP_COMP: CoreCompoundComplexSentence, S_TYPE_CLEFT: CoreCleftSentence,
  S_COND_1: CoreConditionalType1, S_COND_2: CoreConditionalType2, S_COND_3: CoreConditionalType3, S_COND_MIX: CoreConditionalMixed, S_COND_INV_1: CoreConditionalInversion1,
  S_COND_INV_2: CoreConditionalInversion2, S_COND_INV_3: CoreConditionalInversion3, S_WISH_PRES: CoreWishPresent, S_WISH_PAST: CoreWishPast, S_WISH_FUT: CoreWishFuture,
  S_REP_STATE: CoreReportedStatements, S_REP_YN: CoreReportedYesNoQuestions, S_REP_WH: CoreReportedWhQuestions, S_REP_IMP: CoreReportedImperatives, S_REP_RULES: CoreReportedRules,
  W_COMP_EQ: CoreComparisonEquality, W_COMP_COMP: CoreComparative, W_COMP_SUP: CoreSuperlative, W_COMP_CORR: CoreCorrelativeComparison, W_SUBJ_MAND: CoreSubjunctiveMandative,
  W_SUBJ_WERE: CoreSubjunctiveWere, W_SUBJ_FORMULA: CoreSubjunctiveFormulae, W_SUBJ_IT: CoreSubjunctiveIt, W_SUBJ_WOULD: CoreWouldRather, W_MODAL_ABIL: CoreModalAbility,
  W_MODAL_OBLI: CoreModalObligation, W_MODAL_POSS: CoreModalPossibility, W_MODAL_DED: CoreModalDeduction, W_MODAL_ADV: CoreModalAdvice, W_MODAL_HABIT: CoreModalHabit,
  W_ART_AAN: CoreArticleAAn, W_ART_THE: CoreArticleThe, W_ART_ZERO: CoreArticleZero, W_ART_EX: CoreArticleExceptions, W_ADJ_ORD: CoreAdjectiveOrder, W_ADJ_EDING: CoreAdjectiveEdIng,
  W_ADJ_PREP: CoreAdjectivePreposition, W_ADJ_GRAD: CoreAdjectiveGradability, W_ADJ_POS: CoreAdjectivePosition, W_ADV_TYPE: CoreAdverbTypes, W_ADV_POS: CoreAdverbPosition, W_ADV_FREQ: CoreAdverbFrequency,
  W_ADV_FOC: CoreAdverbFocusing, W_ADV_COMP: CoreAdverbComparison, W_NOUN_COUNT: CoreNounCountability, W_NOUN_PLUR: CoreNounPlural, W_NOUN_COMP: CoreNounCompound,
  W_NOUN_POSS: CoreNounPossessive, W_NOUN_NP: CoreNounPhrase, W_VERB_TRAN: CoreVerbTransitivity, W_VERB_STAT: CoreVerbStative, W_VERB_PATT: CoreVerbPatterns, W_VERB_PHRA: CorePhrasalVerbs,
  W_VERB_CAUS: CoreCausativeVerbs, W_CONJ_COORD: CoreCoordinatingConjunctions, W_CONJ_SUB: CoreSubordinatingConjunctions, W_CONJ_CORR: CoreCorrelativeConjunctions,
  W_CONJ_ADV: CoreConjunctiveAdverbs, W_CONJ_PUNC: CoreConjunctionPunctuation, W_PREP_TIME: CorePrepositionsOfTime, W_PREP_PLACE: CorePrepositionsOfPlace, W_PREP_DEP: CorePrepositionsDependent,
  W_PREP_PHRA: CorePrepositionalPhrases, W_PREP_END: CorePrepositionsEndPosition, C_REL_DEF: CoreRelativeClauseDefining, C_REL_NONDEF: CoreRelativeClauseNonDefining,
  C_REL_PRON: CoreRelativePronounsOmission, C_REL_WH: CoreRelativeWhoseWhereWhenWhy, C_REDREL_VING: CoreReducedRelativeVing, C_REDREL_VED: CoreReducedRelativeVed,
  C_REDREL_TO: CoreReducedRelativeTo, C_REDREL_WH: CoreReducedRelativeWhereWhen, M_PRE_NEG: CorePrefixNegative, M_PRE_DEG: CorePrefixDegree, M_PRE_TIME: CorePrefixTime, M_PRE_NUM: CorePrefixNumber,
  M_SUF_NOUN: CoreSuffixNoun, M_SUF_ADJ: CoreSuffixAdjective, M_SUF_VERB: CoreSuffixVerb, M_SUF_ADV: CoreSuffixAdverb, V_PAS_PRES_SIM: CorePassivePresentSimple,
  V_PAS_PRES_PROG: CorePassivePresentContinuous, V_PAS_PRES_PERF: CorePassivePresentPerfect, V_PAS_PRES_PERF_PROG: CorePassivePresentPerfectContinuous,
  V_PAS_PAST_SIM: CorePassivePastSimple, V_PAS_PAST_PROG: CorePassivePastContinuous, V_PAS_PAST_PERF: CorePassivePastPerfect, V_PAS_PAST_PERF_PROG: CorePassivePastPerfectContinuous,
  V_PAS_FUT_SIM: CorePassiveFutureSimple, V_PAS_FUT_BGT: CorePassiveBeGoingTo, V_PAS_FUT_PROG: CorePassiveFutureContinuous, V_PAS_FUT_PERF: CorePassiveFuturePerfect,
  P_ADJ_ATTR: CoreAdjectivePositionAttributive, P_ADJ_PRED: CoreAdjectivePositionPredicative, P_ADJ_COMP: CoreAdjectivePositionComplement, P_ADJ_POST: CoreAdjectivePositionPostpositive,
  P_ADV_MID: CoreAdverbPositionMid, P_ADV_INIT: CoreAdverbPositionInitial, P_ADV_FIN: CoreAdverbPositionFinal, P_ADV_INV: CoreAdverbPositionInversion,
  F_VERB_AUX: CoreVerbAuxiliaryChain, F_VERB_AGREE: CoreVerbAgreement, F_VERB_NEGQ: CoreVerbNegationQuestions, F_VERB_INV: CoreVerbInversion, F_VERB_ELL: CoreVerbEllipsis,
  F_NOUN_SUBJ: CoreNounSubject, F_NOUN_OBJ: CoreNounObject, F_NOUN_COMP: CoreNounComplement, F_NOUN_APP: CoreNounApposition, F_NOUN_DET: CoreNounDeterminer,
  F_CONJ_COORD: CoreConjCoordination, F_CONJ_SUB: CoreConjSubordination, F_CONJ_CORR: CoreConjCorrelative, F_CONJ_ADV: CoreConjAdverbs,
  F_SENT_AFF: CoreSentenceAffirmative, F_SENT_NEG: CoreSentenceNegative, F_SENT_YN: CoreSentenceYesNo, F_SENT_WH: CoreSentenceWh, F_SENT_IMP: CoreSentenceImperative,
};

const getCoreByKey = (key?: string | null): React.FC | null => {
  if (!key) return null;
  return CORE_REGISTRY[key] ?? null;
}

export default function CoreHost({ canonKey }: { canonKey?: string | null }) {
  const Comp = getCoreByKey(canonKey);
  if (!Comp) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600 bg-white">
        Chưa có nội dung cho <b>{canonKey || '—'}</b>.
      </div>
    );
  }
  return <Comp />;
}