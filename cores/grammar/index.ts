// This file acts as a central registry for all grammar-related "core" components.
// It uses relative paths for imports to ensure compatibility with native browser ES modules.

import CorePresentSimple from './CorePresentSimple';
import CorePresentContinuous from './CorePresentContinuous';
import CorePresentPerfect from './CorePresentPerfect';
import CorePresentPerfectContinuous from './CorePresentPerfectContinuous';
import CorePastSimple from './CorePastSimple';
import CorePastContinuous from './CorePastContinuous';
import CorePastPerfect from './CorePastPerfect';
import CorePastPerfectContinuous from './CorePastPerfectContinuous';
import CoreFutureSimple from './CoreFutureSimple';
import CoreBeGoingTo from './CoreBeGoingTo';
import CoreNearFuturePC from './CoreNearFuturePC';
import CoreFutureContinuous from './CoreFutureContinuous';
import CoreFuturePerfect from './CoreFuturePerfect';
import CoreFuturePerfectContinuous from './CoreFuturePerfectContinuous';
import CoreSimpleSentence from './CoreSimpleSentence';
import CoreCompoundSentence from './CoreCompoundSentence';
import CoreComplexSentence from './CoreComplexSentence';
import CoreCompoundComplexSentence from './CoreCompoundComplexSentence';
import CoreCleftSentence from './CoreCleftSentence';
import CoreConditionalType1 from './CoreConditionalType1';
import CoreConditionalType2 from './CoreConditionalType2';
import CoreConditionalType3 from './CoreConditionalType3';
import CoreConditionalMixed from './CoreConditionalMixed';
import CoreConditionalInversion1 from './CoreConditionalInversion1';
import CoreConditionalInversion2 from './CoreConditionalInversion2';
import CoreConditionalInversion3 from './CoreConditionalInversion3';
import CoreWishPresent from './CoreWishPresent';
import CoreWishPast from './CoreWishPast';
import CoreWishFuture from './CoreWishFuture';
import CoreReportedStatements from './CoreReportedStatements';
import CoreReportedYesNoQuestions from './CoreReportedYesNoQuestions';
import CoreReportedWhQuestions from './CoreReportedWhQuestions';
import CoreReportedImperatives from './CoreReportedImperatives';
import CoreReportedRules from './CoreReportedRules';
import CoreComparisonEquality from './CoreComparisonEquality';
import CoreComparative from './CoreComparative';
import CoreSuperlative from './CoreSuperlative';
import CoreCorrelativeComparison from './CoreCorrelativeComparison';
import CoreSubjunctiveMandative from './CoreSubjunctiveMandative';
import CoreSubjunctiveWere from './CoreSubjunctiveWere';
import CoreSubjunctiveFormulae from './CoreSubjunctiveFormulae';
import CoreSubjunctiveIt from './CoreSubjunctiveIt';
import CoreWouldRather from './CoreWouldRather';
import CoreModalAbility from './CoreModalAbility';
import CoreModalObligation from './CoreModalObligation';
import CoreModalPossibility from './CoreModalPossibility';
import CoreModalDeduction from './CoreModalDeduction';
import CoreModalAdvice from './CoreModalAdvice';
import CoreModalHabit from './CoreModalHabit';
import CoreArticleAAn from './CoreArticleAAn';
import CoreArticleThe from './CoreArticleThe';
import CoreArticleZero from './CoreArticleZero';
import CoreArticleExceptions from './CoreArticleExceptions';
import CoreAdjectiveOrder from './CoreAdjectiveOrder';
import CoreAdjectiveEdIng from './CoreAdjectiveEdIng';
import CoreAdjectivePreposition from './CoreAdjectivePreposition';
import CoreAdjectivePosition from './CoreAdjectivePosition';
import CoreAdjectiveGradability from './CoreAdjectiveGradability';
import CoreAdverbTypes from './CoreAdverbTypes';
import CoreAdverbPosition from './CoreAdverbPosition';
import CoreAdverbFrequency from './CoreAdverbFrequency';
import CoreAdverbFocusing from './CoreAdverbFocusing';
import CoreAdverbComparison from './CoreAdverbComparison';
import CoreNounCountability from './CoreNounCountability';
import CoreNounPlural from './CoreNounPlural';
import CoreNounCompound from './CoreNounCompound';
import CoreNounPossessive from './CoreNounPossessive';
import CoreNounPhrase from './CoreNounPhrase';
import CoreVerbTransitivity from './CoreVerbTransitivity';
import CoreVerbStative from './CoreVerbStative';
import CoreVerbPatterns from './CoreVerbPatterns';
import CorePhrasalVerbs from './CorePhrasalVerbs';
import CoreCausativeVerbs from './CoreCausativeVerbs';
import CoreCoordinatingConjunctions from './CoreCoordinatingConjunctions';
import CoreSubordinatingConjunctions from './CoreSubordinatingConjunctions';
import CoreCorrelativeConjunctions from './CoreCorrelativeConjunctions';
import CoreConjunctiveAdverbs from './CoreConjunctiveAdverbs';
import CoreConjunctionPunctuation from './CoreConjunctionPunctuation';
import CorePrepositionsOfTime from './CorePrepositionsOfTime';
import CorePrepositionsOfPlace from './CorePrepositionsOfPlace';
import CorePrepositionsDependent from './CorePrepositionsDependent';
import CorePrepositionalPhrases from './CorePrepositionalPhrases';
import CorePrepositionsEndPosition from './CorePrepositionsEndPosition';
import CoreRelativeClauseDefining from './CoreRelativeClauseDefining';
import CoreRelativeClauseNonDefining from './CoreRelativeClauseNonDefining';
import CoreRelativePronounsOmission from './CoreRelativePronounsOmission';
import CoreRelativeWhoseWhereWhenWhy from './CoreRelativeWhoseWhereWhenWhy';
import CoreReducedRelativeVing from './CoreReducedRelativeVing';
import CoreReducedRelativeVed from './CoreReducedRelativeVed';
import CoreReducedRelativeTo from './CoreReducedRelativeTo';
import CoreReducedRelativeWhereWhen from './CoreReducedRelativeWhereWhen';
import CorePrefixNegative from './CorePrefixNegative';
import CorePrefixDegree from './CorePrefixDegree';
import CorePrefixTime from './CorePrefixTime';
import CorePrefixNumber from './CorePrefixNumber';
import CoreSuffixNoun from './CoreSuffixNoun';
import CoreSuffixAdjective from './CoreSuffixAdjective';
import CoreSuffixVerb from './CoreSuffixVerb';
import CoreSuffixAdverb from './CoreSuffixAdverb';
import CorePassivePresentSimple from './CorePassivePresentSimple';
import CorePassivePresentContinuous from './CorePassivePresentContinuous';
import CorePassivePresentPerfect from './CorePassivePresentPerfect';
import CorePassivePresentPerfectContinuous from './CorePassivePresentPerfectContinuous';
import CorePassivePastSimple from './CorePassivePastSimple';
import CorePassivePastContinuous from './CorePassivePastContinuous';
import CorePassivePastPerfect from './CorePassivePastPerfect';
import CorePassivePastPerfectContinuous from './CorePassivePastPerfectContinuous';
import CorePassiveFutureSimple from './CorePassiveFutureSimple';
import CorePassiveBeGoingTo from './CorePassiveBeGoingTo';
import CorePassiveFutureContinuous from './CorePassiveFutureContinuous';
import CorePassiveFuturePerfect from './CorePassiveFuturePerfect';
import CoreAdjectivePositionAttributive from './CoreAdjectivePositionAttributive';
import CoreAdjectivePositionPredicative from './CoreAdjectivePositionPredicative';
import CoreAdjectivePositionComplement from './CoreAdjectivePositionComplement';
import CoreAdjectivePositionPostpositive from './CoreAdjectivePositionPostpositive';
import CoreAdverbPositionMid from './CoreAdverbPositionMid';
import CoreAdverbPositionInitial from './CoreAdverbPositionInitial';
import CoreAdverbPositionFinal from './CoreAdverbPositionFinal';
import CoreAdverbPositionInversion from './CoreAdverbPositionInversion';
import CoreVerbAuxiliaryChain from './CoreVerbAuxiliaryChain';
import CoreVerbAgreement from './CoreVerbAgreement';
import CoreVerbNegationQuestions from './CoreVerbNegationQuestions';
import CoreVerbInversion from './CoreVerbInversion';
import CoreVerbEllipsis from './CoreVerbEllipsis';
import CoreNounSubject from './CoreNounSubject';
import CoreNounObject from './CoreNounObject';
import CoreNounComplement from './CoreNounComplement';
import CoreNounApposition from './CoreNounApposition';
import CoreNounDeterminer from './CoreNounDeterminer';
import CoreConjCoordination from './CoreConjCoordination';
import CoreConjSubordination from './CoreConjSubordination';
import CoreConjCorrelative from './CoreConjCorrelative';
import CoreConjAdverbs from './CoreConjAdverbs';
import CoreSentenceAffirmative from './CoreSentenceAffirmative';
import CoreSentenceNegative from './CoreSentenceNegative';
import CoreSentenceYesNo from './CoreSentenceYesNo';
import CoreSentenceWh from './CoreSentenceWh';
import CoreSentenceImperative from './CoreSentenceImperative';

export const CORE_REGISTRY: Record<string, React.FC | undefined> = {
  "T_PRES_SIM": CorePresentSimple,
  "T_PRES_PROG": CorePresentContinuous,
  "T_PRES_PERF": CorePresentPerfect,
  "T_PRES_PERF_PROG": CorePresentPerfectContinuous,
  "T_PAST_SIM": CorePastSimple,
  "T_PAST_PROG": CorePastContinuous,
  "T_PAST_PERF": CorePastPerfect,
  "T_PAST_PERF_PROG": CorePastPerfectContinuous,
  "T_FUT_SIM": CoreFutureSimple,
  "T_FUT_NEAR_BGT": CoreBeGoingTo,
  "T_FUT_PROG": CoreFutureContinuous,
  "T_FUT_PERF": CoreFuturePerfect,
  "T_FUT_PERF_CONT": CoreFuturePerfectContinuous,
  "T_FUT_NEAR_PC": CoreNearFuturePC,
  "S_TYPE_SIMPLE": CoreSimpleSentence,
  "S_TYPE_COMPOUND": CoreCompoundSentence,
  "S_TYPE_COMPLEX": CoreComplexSentence,
  "S_TYPE_COMP_COMP": CoreCompoundComplexSentence,
  "S_TYPE_CLEFT": CoreCleftSentence,
  "S_COND_1": CoreConditionalType1,
  "S_COND_2": CoreConditionalType2,
  "S_COND_3": CoreConditionalType3,
  "S_COND_MIX": CoreConditionalMixed,
  "S_COND_INV_1": CoreConditionalInversion1,
  "S_COND_INV_2": CoreConditionalInversion2,
  "S_COND_INV_3": CoreConditionalInversion3,
  "S_WISH_PRES": CoreWishPresent,
  "S_WISH_PAST": CoreWishPast,
  "S_WISH_FUT": CoreWishFuture,
  "S_REP_STATE": CoreReportedStatements,
  "S_REP_YN": CoreReportedYesNoQuestions,
  "S_REP_WH": CoreReportedWhQuestions,
  "S_REP_IMP": CoreReportedImperatives,
  "S_REP_RULES": CoreReportedRules,
  "W_COMP_EQ": CoreComparisonEquality,
  "W_COMP_COMP": CoreComparative,
  "W_COMP_SUP": CoreSuperlative,
  "W_COMP_CORR": CoreCorrelativeComparison,
  "W_SUBJ_MAND": CoreSubjunctiveMandative,
  "W_SUBJ_WERE": CoreSubjunctiveWere,
  "W_SUBJ_FORMULA": CoreSubjunctiveFormulae,
  "W_SUBJ_IT": CoreSubjunctiveIt,
  "W_SUBJ_WOULD": CoreWouldRather,
  "W_MODAL_ABIL": CoreModalAbility,
  "W_MODAL_OBLI": CoreModalObligation,
  "W_MODAL_POSS": CoreModalPossibility,
  "W_MODAL_DED": CoreModalDeduction,
  "W_MODAL_ADV": CoreModalAdvice,
  "W_MODAL_HABIT": CoreModalHabit,
  "W_ART_AAN": CoreArticleAAn,
  "W_ART_THE": CoreArticleThe,
  "W_ART_ZERO": CoreArticleZero,
  "W_ART_EX": CoreArticleExceptions,
  "W_ADJ_ORD": CoreAdjectiveOrder,
  "W_ADJ_EDING": CoreAdjectiveEdIng,
  "W_ADJ_PREP": CoreAdjectivePreposition,
  "W_ADJ_POS": CoreAdjectivePosition,
  "W_ADJ_GRAD": CoreAdjectiveGradability,
  "W_ADV_TYPE": CoreAdverbTypes,
  "W_ADV_POS": CoreAdverbPosition,
  "W_ADV_FREQ": CoreAdverbFrequency,
  "W_ADV_FOC": CoreAdverbFocusing,
  "W_ADV_COMP": CoreAdverbComparison,
  "W_NOUN_COUNT": CoreNounCountability,
  "W_NOUN_PLUR": CoreNounPlural,
  "W_NOUN_COMP": CoreNounCompound,
  "W_NOUN_POSS": CoreNounPossessive,
  "W_NOUN_NP": CoreNounPhrase,
  "W_VERB_TRAN": CoreVerbTransitivity,
  "W_VERB_STAT": CoreVerbStative,
  "W_VERB_PATT": CoreVerbPatterns,
  "W_VERB_PHRA": CorePhrasalVerbs,
  "W_VERB_CAUS": CoreCausativeVerbs,
  "W_CONJ_COORD": CoreCoordinatingConjunctions,
  "W_CONJ_SUB": CoreSubordinatingConjunctions,
  "W_CONJ_CORR": CoreCorrelativeConjunctions,
  "W_CONJ_ADV": CoreConjunctiveAdverbs,
  "W_CONJ_PUNC": CoreConjunctionPunctuation,
  "W_PREP_TIME": CorePrepositionsOfTime,
  "W_PREP_PLACE": CorePrepositionsOfPlace,
  "W_PREP_DEP": CorePrepositionsDependent,
  "W_PREP_PHRA": CorePrepositionalPhrases,
  "W_PREP_END": CorePrepositionsEndPosition,
  "C_REL_DEF": CoreRelativeClauseDefining,
  "C_REL_NONDEF": CoreRelativeClauseNonDefining,
  "C_REL_PRON": CoreRelativePronounsOmission,
  "C_REL_WH": CoreRelativeWhoseWhereWhenWhy,
  "C_REDREL_VING": CoreReducedRelativeVing,
  "C_REDREL_VED": CoreReducedRelativeVed,
  "C_REDREL_TO": CoreReducedRelativeTo,
  "C_REDREL_WH": CoreReducedRelativeWhereWhen,
  "M_PRE_NEG": CorePrefixNegative,
  "M_PRE_DEG": CorePrefixDegree,
  "M_PRE_TIME": CorePrefixTime,
  "M_PRE_NUM": CorePrefixNumber,
  "M_SUF_NOUN": CoreSuffixNoun,
  "M_SUF_ADJ": CoreSuffixAdjective,
  "M_SUF_VERB": CoreSuffixVerb,
  "M_SUF_ADV": CoreSuffixAdverb,
  "V_PAS_PRES_SIM": CorePassivePresentSimple,
  "V_PAS_PRES_PROG": CorePassivePresentContinuous,
  "V_PAS_PRES_PERF": CorePassivePresentPerfect,
  "V_PAS_PRES_PERF_PROG": CorePassivePresentPerfectContinuous,
  "V_PAS_PAST_SIM": CorePassivePastSimple,
  "V_PAS_PAST_PROG": CorePassivePastContinuous,
  "V_PAS_PAST_PERF": CorePassivePastPerfect,
  "V_PAS_PAST_PERF_PROG": CorePassivePastPerfectContinuous,
  "V_PAS_FUT_SIM": CorePassiveFutureSimple,
  "V_PAS_FUT_BGT": CorePassiveBeGoingTo,
  "V_PAS_FUT_PROG": CorePassiveFutureContinuous,
  "V_PAS_FUT_PERF": CorePassiveFuturePerfect,
  "P_ADJ_ATTR": CoreAdjectivePositionAttributive,
  "P_ADJ_PRED": CoreAdjectivePositionPredicative,
  "P_ADJ_COMP": CoreAdjectivePositionComplement,
  "P_ADJ_POST": CoreAdjectivePositionPostpositive,
  "P_ADV_MID": CoreAdverbPositionMid,
  "P_ADV_INIT": CoreAdverbPositionInitial,
  "P_ADV_FIN": CoreAdverbPositionFinal,
  "P_ADV_INV": CoreAdverbPositionInversion,
  "F_VERB_AUX": CoreVerbAuxiliaryChain,
  "F_VERB_AGREE": CoreVerbAgreement,
  "F_VERB_NEGQ": CoreVerbNegationQuestions,
  "F_VERB_INV": CoreVerbInversion,
  "F_VERB_ELL": CoreVerbEllipsis,
  "F_NOUN_SUBJ": CoreNounSubject,
  "F_NOUN_OBJ": CoreNounObject,
  "F_NOUN_COMP": CoreNounComplement,
  "F_NOUN_APP": CoreNounApposition,
  "F_NOUN_DET": CoreNounDeterminer,
  "F_CONJ_COORD": CoreConjCoordination,
  "F_CONJ_SUB": CoreConjSubordination,
  "F_CONJ_CORR": CoreConjCorrelative,
  "F_CONJ_ADV": CoreConjAdverbs,
  "F_SENT_AFF": CoreSentenceAffirmative,
  "F_SENT_NEG": CoreSentenceNegative,
  "F_SENT_YN": CoreSentenceYesNo,
  "F_SENT_WH": CoreSentenceWh,
  "F_SENT_IMP": CoreSentenceImperative,
};

export const grammarCores = CORE_REGISTRY;
