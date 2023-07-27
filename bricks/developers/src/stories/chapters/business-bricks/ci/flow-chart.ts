import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/flow-chart.md";

import { CI_FLOW_ID } from "../../../constants";

export const story: Story = {
  storyId: "ci.flow-chart",
  type: "brick",
  text: {
    en: "Flow Chart",
    zh: "流水线可视化构件",
  },
  description: {
    en: "",
    zh: "根据流水线build信息，可视化流水线",
  },
  icon: {
    lib: "easyops",
    category: "app",
    icon: "flow",
  },
  conf: {
    brick: "ci.flow-chart",
    properties: {
      build: {
        git_meta: {
          author_name: "lynette",
          ref: "refs/heads/master",
          after: "22435464646",
        },
        id: "123",
        pipelineId: "5a0917fc1433a",
        projectId: "5a0917e4c077c",
        sender: "lynette",
        stages: [
          {
            id: "1",
            number: 1,
            state: "running",
            stage_name: "Build",
            parallel: true,
            steps: [
              {
                name: "push",
                id: "a68d5b75-c492-4fe5-9b11-594b59ba6826",
                number: 1,
                log_id: "1",
                state: "succeeded",
                started: 123,
              },
              {
                name: "JUnit",
                id: "a68d5b75-c492-4fe5-9b11-594b59badfds",
                number: 2,
                log_id: "2",
                state: "running",
                started: 123,
              },
            ],
          },
          {
            id: "2",
            number: 2,
            state: "failed",
            stage_name: "Test",
            parallel: true,
            steps: [
              {
                name: "push",
                id: "a68d5b75-c492-4fe5-9b11-594b59ba6dd6",
                number: 1,
                log_id: "1",
                state: "failed",
                started: 123,
              },
              {
                name: "JUnit",
                id: "a68d5b75-c492-4fe5-9b11-594b59badfds222",
                number: 2,
                log_id: "3",
                state: "pending",
                started: 123,
              },
            ],
          },
          {
            id: "3",
            number: 3,
            state: "pending",
            stage_name: "Test",
            parallel: false,
            steps: [
              {
                name: "push",
                id: "a68d5b75-c492-4fe5-9b11-594b59ba6dd6",
                number: 1,
                log_id: "1",
                state: "pending",
                started: 123,
              },
            ],
          },
        ],
        status: {
          state: "failed",
          finished: "1560227339",
          started: "1560227228",
          updated: "1560227339",
        },
        events: [
          "test",
          'kind: pipeline↵name: developci↵↵stages:↵- name: clone↵  working_dir: /work↵  steps:↵  - step:↵    name: clone↵    image: alpine/git↵    working_dir: /work↵    description: "check code"↵    commands:↵    - git -c http.sslVerify=false clone https://gitlab-ci-token:34vaUs1VcqCDAhmWeCR8@git.easyops.local/easyops-go/pipeline /work↵    - git checkout $PIPELINE_COMMIT↵    volumeMounts:↵    - name: work↵      path: /work↵- name: build↵  parallel: true↵  privileged: true↵  steps:↵  - name: test↵    image: docker.easyops.local/ci/golang-build:0.6↵    working_dir: /work↵    description: "test code"↵    commands:↵    - go test -tags mock ./...↵    env:↵      - name: https_proxy↵        value: http://192.168.110.32:6152↵    volumeMounts:↵    - name: work↵      path: /work↵    - name: go-cache↵      path: /go↵  - name: build↵    image: docker.easyops.local/ci/golang-build:0.6↵    working_dir: /work↵    description: "build code"↵    commands:↵    - go build -o bin/pipeline go.easyops.local/pipeline/cmd/pipeline↵    env:↵      - name: https_proxy↵        value: http://192.168.110.32:6152↵    volumeMounts:↵    - name: work↵      path: /work↵    - name: go-cache↵      path: /go↵- name: push↵  steps:↵  - step:↵    name: push↵    image: docker↵    working_dir: /work↵    description: "push image"↵    commands:↵    - docker login docker.easyops.local -u charlies -p Charlieschen1↵    - docker build -t docker.easyops.local/ci/pipeline:0.1 .↵    - docker push docker.easyops.local/ci/pipeline:0.1↵    volumeMounts:↵    - name: work↵      path: /work↵    - name: docker↵      path: /var/run/docker.sock↵volumes:↵- name: work↵  emptyDir: {}↵- name: docker↵  hostPath:↵    path: /var/run/docker.sock↵- name: go-cache↵  hostPath:↵    path: /go-cache↵↵',
        ],
        created: 1560395338,
        artifact: null,
        number: "1",
        yaml_string:
          "name: developci↵kind: pipeline↵stages:↵   name: lll↵    parallel: false↵    steps:↵      - name: ooo↵        category: source↵        privileged: false↵        imagePullPolicy: if-not-present↵        plugin: git_clone↵        version: 0.0.1↵        image: 'docker.easyops.local/ci/git_clone:1.0.0'↵        settings:↵          depth: '1'↵          recursive: 'true'↵          skip_verify: 'true'↵        mode: plugin↵",
      },
      projectData: {
        pipeline: [
          {
            alias_name: "开发打包流水线",
            creator: "emily",
            ctime: "2020-03-11 18:14:17",
            id: "5a0917fc1433a",
            notify: { methods: [], mode: [], user_groups: [], users: [] },
            step_timeout: 0,
            variables: [],
            workflow_type: "yaml_template",
            yaml_path: "undefined",
            yaml_string: null,
            yaml_url: null,
          },
        ],
        project: {
          creator: "emily",
          ctime: "2020-03-11 18:13:53",
          default_branch: "master",
          favorite: false,
          git_http_url: "https://git.easyops.local/pipeline-plugins/test1.git",
          git_ssh_url: "git@git.easyops.local:pipeline-plugins/test1.git",
          id: "5a0917e4c077c",
          link: "https://git.easyops.local/pipeline-plugins/test1",
          mtime: null,
          name: "pipeline-plugins/test1",
          name_with_namespace: "pipeline-plugins / test1",
          path_with_namespace: "pipeline-plugins/test1",
          repo_id: 848,
          repo_name: "test1",
          tags: [],
          variables: [],
        },
        provider: {
          api_url: "https://git.easyops.local",
          auth: { token: "eCT4Rz8oG1v1HyJzKRzy", type: "basic" },
          creator: "emily",
          ctime: "2020-03-11 18:13:33",
          default: null,
          id: "5a0917d19db5c",
          mtime: null,
          name: "easyops_gitlab",
          type: "gitlab",
        },
      },
      showCard: true,
    }, // 输出事件：步骤Id 改成了输出步骤的detail包括步骤的log和yaml和stageName等信息
    events: {
      "select.success": {
        action: "console.log",
      },
    },
  },
  doc: docMD,
};
