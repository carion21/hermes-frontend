
class Consts {
    static NLIMIT = 10;

    static PORT_SYSTEM = 3000
    static stage_NAME = "Hermes"
    static stage_AUTHOR = "AmazonGirl"
    static stage_VERSION = "1.0.0"
    static stage_DESCRIPTION = "Systeme de gestion des reclamations"

    static USERPROFILE_TYPE_UNDEFINED = 0;
    static USERPROFILE_TYPE_ADMIN = 1;
    static USERPROFILE_TYPE_OPERATOR = 2;

    static DEFAULT_DESC_APIKEY_BACKOFFICE = "BackOffice User";
    static DEFAULT_VALUE_APIKEY_BACKOFFICE = "8DNICBX4JBMY89FATTZJ1FTDEOR2QFQN";

    static DEFAULT_PROFILES = ["admin", "operator"];
    static DEFAULT_PROFILE_ADMIN = "admin";
    static DEFAULT_PROFILE_OPERATOR = "operator";
    static DEFAULT_ROUTE_ADMIN = "/admin";
    static DEFAULT_ROUTE_OPERATOR = "/operator";

    static DEFAULT_TYPES = [
        "string",
        "string_not_empty",
        "string_email",
        "string_date",
        "string_integer",
        "string_boolean",
        "number",
        "integer",
        "boolean",
        "object",
        "array",
        "array_of_string",
        "array_of_number",
        "array_of_integer",
        "array_of_boolean",
        "array_of_object",
        "array_of_string_integer"
    ];


    static URL_OF_BACKEND = "https://hermes-api.geasscorp.com"
    // static URL_OF_BACKEND = "http://localhost:8000"

    static ROUTE_SECURITY_SIGNIN = "/security/sign_in";

    static ROUTE_ADMIN_STAGE_LIST = "/admin/stage_list";
    static ROUTE_ADMIN_ADD_STAGE = "/admin/new_stage";
    static ROUTE_ADMIN_VIEW_STAGE = "/admin/view_stage";
    static ROUTE_ADMIN_EDIT_STAGE = "/admin/update_stage";
    static ROUTE_ADMIN_ENABLE_STAGE = "/admin/enable_stage";
    static ROUTE_ADMIN_DISABLE_STAGE = "/admin/disable_stage";
    static ROUTE_ADMIN_DELETE_STAGE = "/admin/delete_stage";

    static ROUTE_ADMIN_OPERATOR_LIST = "/admin/operator_list";
    static ROUTE_ADMIN_ADD_OPERATOR = "/admin/new_operator";
    static ROUTE_ADMIN_VIEW_OPERATOR = "/admin/view_operator";
    static ROUTE_ADMIN_EDIT_OPERATOR = "/admin/update_operator";
    static ROUTE_ADMIN_ENABLE_OPERATOR = "/admin/enable_operator";
    static ROUTE_ADMIN_DISABLE_OPERATOR = "/admin/disable_operator";
    static ROUTE_ADMIN_DELETE_OPERATOR = "/admin/delete_operator";

    static ROUTE_ADMIN_RESET_OPERATOR_PASSWORD = "/admin/reset_operator_password";

    static ROUTE_ADMIN_CLIENT_LIST = "/admin/client_list";
    static ROUTE_ADMIN_ADD_CLIENT = "/admin/new_client";
    static ROUTE_ADMIN_VIEW_CLIENT = "/admin/view_client";
    static ROUTE_ADMIN_EDIT_CLIENT = "/admin/update_client";
    static ROUTE_ADMIN_ENABLE_CLIENT = "/admin/enable_client";
    static ROUTE_ADMIN_DISABLE_CLIENT = "/admin/disable_client";
    static ROUTE_ADMIN_DELETE_CLIENT = "/admin/delete_client";

    static ROUTE_ADMIN_RESET_CLIENT_PASSWORD = "/admin/reset_client_password";

    static ROUTE_ADMIN_REQUEST_LIST = "/admin/request_list";
    static ROUTE_ADMIN_VIEW_REQUEST = "/admin/view_request";

    static ROUTE_OPERATOR_REQUEST_LIST = "/operator/request_list";
    static ROUTE_OPERATOR_VIEW_REQUEST = "/operator/view_request";
    static ROUTE_OPERATOR_UPDATE_REQUEST = "/operator/update_request";

    static ROUTE_OPERATOR_VIEW_CLIENT = "/operator/view_client";
    static ROUTE_OPERATOR_REQUEST_LIST_BY_CLIENT = "/operator/request_list_by_client";


    static REQUEST_STATUS_SUBMITTED = 0;
    static REQUEST_STATUS_BEING_PROCESSED = 1;
    static REQUEST_STATUS_AWAITING_CLIENT = 2;
    static REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED = 3;
    static REQUEST_STATUS_RESOLVED_AND_EVALUATED = 4;
    static REQUEST_STATUS_NOT_RESOLVED = 5;

    static REQUEST_STATUSES = [
        Consts.REQUEST_STATUS_SUBMITTED,
        Consts.REQUEST_STATUS_BEING_PROCESSED,
        Consts.REQUEST_STATUS_AWAITING_CLIENT,
        Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED,
        Consts.REQUEST_STATUS_RESOLVED_AND_EVALUATED,
        Consts.REQUEST_STATUS_NOT_RESOLVED
    ];

    static OPERATOR_REQUEST_STATUSES_STEPS = {
        [Consts.REQUEST_STATUS_BEING_PROCESSED]: [
            Consts.REQUEST_STATUS_SUBMITTED
        ],
        [Consts.REQUEST_STATUS_AWAITING_CLIENT]: [
            Consts.REQUEST_STATUS_BEING_PROCESSED
        ],
        [Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED]: [
            Consts.REQUEST_STATUS_BEING_PROCESSED,
            Consts.REQUEST_STATUS_AWAITING_CLIENT
        ],
        [Consts.REQUEST_STATUS_NOT_RESOLVED]: [
            Consts.REQUEST_STATUS_BEING_PROCESSED,
            Consts.REQUEST_STATUS_AWAITING_CLIENT
        ]
    };

    static OPERATOR_REQUEST_STATUSES_PERMISSIONS = {
        [Consts.REQUEST_STATUS_SUBMITTED]: [
            Consts.REQUEST_STATUS_BEING_PROCESSED
        ],
        [Consts.REQUEST_STATUS_BEING_PROCESSED]: [
            Consts.REQUEST_STATUS_AWAITING_CLIENT,
            Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED,
            Consts.REQUEST_STATUS_NOT_RESOLVED
        ],
        [Consts.REQUEST_STATUS_AWAITING_CLIENT]: [
            Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED,
            Consts.REQUEST_STATUS_NOT_RESOLVED
        ]
    };

    static REQUEST_STATUSES_LABELS_EN = {
        [Consts.REQUEST_STATUS_SUBMITTED]: "Submitted",
        [Consts.REQUEST_STATUS_BEING_PROCESSED]: "Being processed",
        [Consts.REQUEST_STATUS_AWAITING_CLIENT]: "Awaiting client",
        [Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED]: "Resolved and not evaluated",
        [Consts.REQUEST_STATUS_RESOLVED_AND_EVALUATED]: "Resolved and evaluated",
        [Consts.REQUEST_STATUS_NOT_RESOLVED]: "Not resolved"
    }

    static REQUEST_STATUSES_LABELS_FR = {
        [Consts.REQUEST_STATUS_SUBMITTED]: "Soumise",
        [Consts.REQUEST_STATUS_BEING_PROCESSED]: "En cours de traitement",
        [Consts.REQUEST_STATUS_AWAITING_CLIENT]: "En attente du client",
        [Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED]: "Résolue et non évaluée",
        [Consts.REQUEST_STATUS_RESOLVED_AND_EVALUATED]: "Résolue et évaluée",
        [Consts.REQUEST_STATUS_NOT_RESOLVED]: "Non résolue"
    }

    static REQUEST_STATUSES_LABELS = Consts.REQUEST_STATUSES_LABELS_FR;

    static REQUEST_STATUSES_BADGES= {
        [Consts.REQUEST_STATUS_SUBMITTED]: "secondary",
        [Consts.REQUEST_STATUS_BEING_PROCESSED]: "warning",
        [Consts.REQUEST_STATUS_AWAITING_CLIENT]: "primary",
        [Consts.REQUEST_STATUS_NOT_RESOLVED]: "danger",
        [Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED]: "dark",
        [Consts.REQUEST_STATUS_RESOLVED_AND_EVALUATED]: "success"
    }

    static SERVICE_TYPES = [
        "undefined",
        "security_login",
        "admin_add_stage",
        "admin_edit_stage",
        "admin_delete_stage",
        "admin_add_operator",
        "admin_edit_operator",
        "admin_delete_operator",
        "admin_add_client",
        "admin_edit_client",
        "admin_delete_client",
    ];

    static SERVICE_TYPES_FIELDS = {
        "undefined": {},
        "security_login": {
            "fields": ["username", "password"],
            "types": ["string", "string"],
            "required": ["username", "password"]
        },
        "admin_add_stage": {
            "fields": ["parent_stage_id", "label", "description"],
            "types": ["string_integer", "string", "string"],
            "required": ["label"]
        },
        "admin_edit_stage": {
            "fields": ["label", "description"],
            "types": ["string", "string"],
            "required": ["label"]
        },
        "admin_delete_stage": {
            "fields": ["confirmation"],
            "types": ["string_boolean"],
            "required": ["confirmation"]
        },
        "admin_add_operator": {
            "fields": ["username", "password", "firstname", "lastname", "email", "phone"],
            "types": ["string", "string", "string", "string", "string_email", "string"],
            "required": ["username", "password", "firstname", "lastname", "phone"]
        },
        "admin_edit_operator": {
            "fields": ["username", "firstname", "lastname", "email", "phone"],
            "types": ["string", "string", "string", "string_email", "string"],
            "required": ["username", "firstname", "lastname", "phone"]
        },
        "admin_delete_operator": {
            "fields": ["confirmation"],
            "types": ["string_boolean"],
            "required": ["confirmation"]
        },
        "admin_add_client": {
            "fields": ["username", "password", "firstname", "lastname", "email", "phone"],
            "types": ["string", "string", "string", "string", "string_email", "string"],
            "required": ["username", "password", "firstname", "lastname", "phone"]
        },
        "admin_edit_client": {
            "fields": ["username", "firstname", "lastname", "email", "phone"],
            "types": ["string", "string", "string", "string_email", "string"],
            "required": ["username", "firstname", "lastname", "phone"]
        },
        "admin_delete_client": {
            "fields": ["confirmation"],
            "types": ["string_boolean"],
            "required": ["confirmation"]
        }
    };





}

module.exports = Consts;