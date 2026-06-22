import { e as createServerRpc, c as createServerFn } from "./ai-DTqZfz-A.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-Bg7BSutF.mjs";
import { supabaseAdmin } from "./client.server-DTlM-9S9.mjs";
import "../_libs/react.mjs";
import "../_libs/seroval.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const deleteCurrentUserAccount_createServerFn_handler = createServerRpc({
  id: "aa5c6ff2f1b50a0696b66e3fe430122cb99f6d2cb1bdac8763c2511f4610ca48",
  name: "deleteCurrentUserAccount",
  filename: "src/lib/auth.functions.ts"
}, (opts) => deleteCurrentUserAccount.__executeServer(opts));
const deleteCurrentUserAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(deleteCurrentUserAccount_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  if (!userId) {
    throw new Error("Unauthorized: No user ID found");
  }
  console.log(`[auth] Initiating deletion for user ID: ${userId}`);
  console.log(`[auth] Using supabaseAdmin client:`, !!supabaseAdmin);
  console.log(`[auth] Deleting user account: ${userId}`);
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) {
    console.error(`[auth] Error deleting user:`, error);
    throw new Error(error.message);
  }
  return {
    success: true
  };
});
export {
  deleteCurrentUserAccount_createServerFn_handler
};
