export const apiAutomationData = {
  reportTitle: "API Test Effort Estimation Report (Manual vs AI-Assisted)",
  apis: [
    {
      method: "GET",
      "API Name": "Get Update Marketplace Version For Store",
      operationId:
        "get_update_marketplace_version_for_store_v1_store_store_id_update_marketplaces_to_latest_version_get",
      complexity: "Medium",
      manualEffort: {
        qa5yrs: 5.5,
        qa1yr: 8.3,
      },
      aiEffort: 1.7,
      timeSavedPercent: 70,
    },
    {
      method: "POST",
      "API Name": "Post Update Marketplace Version For Store",
      operationId:
        "post_update_marketplace_version_for_store_v1_store_store_id_update_marketplaces_to_latest_version_post",
      complexity: "Medium",
      manualEffort: {
        qa5yrs: 6.5,
        qa1yr: 9.8,
      },
      aiEffort: 2.0,
      timeSavedPercent: 70,
    },
    {
      method: "POST",
      "API Name": "Post Update Store",
      operationId: "post_update_store_v1_store_store_id_new_settings_v2_post",
      complexity: "High",
      manualEffort: {
        qa5yrs: 7.5,
        qa1yr: 11.2,
      },
      aiEffort: 2.2,
      timeSavedPercent: 70,
    },
    {
      method: "POST",
      "API Name": "Post Update Store",
      operationId: "post_update_store_v1_store_store_id_v3_post",
      complexity: "High",
      manualEffort: {
        qa5yrs: 7.5,
        qa1yr: 11.2,
      },
      aiEffort: 2.2,
      timeSavedPercent: 70,
    },
    {
      method: "POST",
      "API Name": "Post Update Store",
      operationId: "post_update_store_v1_store_store_id_store_settings_post",
      complexity: "High",
      manualEffort: {
        qa5yrs: 7.5,
        qa1yr: 11.2,
      },
      aiEffort: 2.2,
      timeSavedPercent: 70,
    },
    {
      method: "GET",
      "API Name": "Get Saved Store Settings",
      operationId: "get_saved_store_settings_v1_store_store_id_settings_get",
      complexity: "Medium",
      manualEffort: {
        qa5yrs: 5.5,
        qa1yr: 8.3,
      },
      aiEffort: 1.7,
      timeSavedPercent: 70,
    },
  ],
  summary: {
    totalApis: 6,
    totalManualEffortQa5yrs: 40.0,
    totalManualEffortQa1yr: 60.0,
    totalAiEffort: 12.0,
    averageTimeSavedPercent: 70,
  },
};
