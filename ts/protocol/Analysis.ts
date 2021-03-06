import {
  TimeStampedPoint,
  ExecutionPoint
} from "./Recording";
import {
  SessionId
} from "./Session";
import {
  PauseId
} from "./Pause";
import {
  PointDescription,
  Location,
  SourceId,
  SourceLocation
} from "./Debugger";

/**
 * Unique identifier for an analysis.
 */
export type AnalysisId = string;

/**
 * Input to the mapper function.
 */
export interface MapInput extends TimeStampedPoint {

  /**
   * Associated session ID for the current execution point.
   */
  sessionId: SessionId;

  /**
   * Pause ID created for the current execution point.
   */
  pauseId: PauseId;
}

/**
 * Key for an analysis result. This can be any JSON value. Keys are equivalent
 * if they are structurally equivalent: they have the same contents, though
 * object keys may be ordered differently when stringified.
 */
export type AnalysisKey = any;

/**
 * Value for an analysis result. This can be any JSON value.
 */
export type AnalysisValue = any;

/**
 * A key/value pair produced by an analysis.
 */
export interface AnalysisEntry {

  key: AnalysisKey;

  value: AnalysisValue;
}

export interface createAnalysisParameters {

  /**
   * Body of the mapper function. The mapper function takes two arguments:
   * <code>input</code> is a <code>MapInput</code> object, and
   * <code>sendCommand</code> is a function that can be passed a command
   * name and parameters (in that order) and synchronously returns the
   * command result. Only methods from the <code>Pause</code> domain may
   * be used with <code>sendCommand</code>. The mapper function must
   * return an array of <code>AnalysisEntry</code> objects.
   */
  mapper: string;

  /**
   * Body of the reducer function. The reducer function takes two arguments:
   * <code>key</code> is an <code>AnalysisKey</code>, and <code>values</code>
   * is an array of <code>AnalysisValue</code>. All the values
   * were associated with the key by an earlier call to <code>mapper</code>
   * <strong>or</strong> <code>reducer</code>. The reducer function must
   * return an <code>AnalysisValue</code>, which summarizes all
   * the input values and will be associated with <code>key</code> for
   * <code>analysisResult</code> events or further calls to the reducer.
   * The reducer may be omitted if no reduction phase is needed.
   */
  reducer?: string;

  /**
   * Whether effectful commands in the <code>Pause</code> domain might be
   * sent by the mapper function. An analysis which does not use effectful
   * commands will run more efficiently. See the <code>Pause</code> domain
   * for which commands are effectful.
   */
  effectful: boolean;
}

export interface createAnalysisResult {

  /**
   * ID of the resulting analysis.
   */
  analysisId: AnalysisId;
}

export interface addLocationParameters {

  /**
   * Associated analysis.
   */
  analysisId: AnalysisId;

  /**
   * Session containing the source.
   */
  sessionId: SessionId;

  /**
   * Location to apply the analysis to.
   */
  location: Location;

  /**
   * If specified, the analysis will only be applied to matching points which
   * execute while this point's frame is on the stack.
   */
  onStackFrame?: ExecutionPoint;
}

export interface addLocationResult {

}

export interface addFunctionEntryPointsParameters {

  /**
   * Associated analysis.
   */
  analysisId: AnalysisId;

  /**
   * Associated session.
   */
  sessionId: SessionId;

  /**
   * Source to look for function entry points in.
   */
  sourceId: SourceId;

  /**
   * If specified, earlier functions will be excluded.
   */
  begin?: SourceLocation;

  /**
   * If specified, later functions will be excluded.
   */
  end?: SourceLocation;
}

export interface addFunctionEntryPointsResult {

}

export interface addRandomPointsParameters {

  /**
   * Associated analysis.
   */
  analysisId: AnalysisId;

  /**
   * Associated session.
   */
  sessionId: SessionId;

  /**
   * Maximum number of points to apply the analysis to.
   */
  numPoints: number;
}

export interface addRandomPointsResult {

}

export interface addEventHandlerEntryPointsParameters {

  /**
   * Associated analysis.
   */
  analysisId: AnalysisId;

  /**
   * Associated session.
   */
  sessionId: SessionId;

  /**
   * Type of event whose handler calls the analysis should be applied to.
   */
  eventType: string;
}

export interface addEventHandlerEntryPointsResult {

}

export interface addExceptionPointsParameters {

  /**
   * Associated analysis.
   */
  analysisId: AnalysisId;

  /**
   * Associated session.
   */
  sessionId: SessionId;
}

export interface addExceptionPointsResult {

}

export interface runAnalysisParameters {

  /**
   * Analysis to run.
   */
  analysisId: AnalysisId;
}

export interface runAnalysisResult {

}

export interface releaseAnalysisParameters {

  /**
   * Analysis to release.
   */
  analysisId: AnalysisId;
}

export interface releaseAnalysisResult {

}

export interface findAnalysisPointsParameters {

  /**
   * Analysis to find points for.
   */
  analysisId: AnalysisId;
}

export interface findAnalysisPointsResult {

}

/**
 * Describes some results of an analysis.
 */
export interface analysisResult {

  /**
   * Associated analysis.
   */
  analysisId: AnalysisId;

  /**
   * Results for different keys. If a reducer was specified, a given key can
   * only appear once in the results emitted for the analysis.
   */
  results: AnalysisEntry[];
}

/**
 * Describes an error that occurred when running an analysis mapper or reducer
 * function. This will not be emitted for every error, but if there was any
 * error then at least one event will be emitted.
 */
export interface analysisError {

  /**
   * Associated analysis.
   */
  analysisId: AnalysisId;

  /**
   * Description of the error.
   */
  error: string;
}

/**
 * Describes some points at which an analysis will run.
 */
export interface analysisPoints {

  /**
   * Associated analysis.
   */
  analysisId: AnalysisId;

  /**
   * Some points at which the analysis will run.
   */
  points: PointDescription[];
}
