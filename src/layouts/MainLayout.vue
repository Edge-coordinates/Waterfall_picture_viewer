<template>
  <!--
Forked from:
https://quasar.dev/quasar-cli-vite/developing-electron-apps/frameless-electron-window#example--full-example
-->
  <q-layout view="lHh lpr lFf" class="h-fullx shadow-2">
    <q-header elevated>
      <q-bar class="q-electron-drag">
        <q-icon name="mdi-view-dashboard"></q-icon>
        <div class="font-bold">Img View</div>
        <div class="cursor-pointer non-selectable q-electron-drag--exception">
        <!-- ANCHOR File  -->
          File
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Open...</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>所有按键均没有功能</q-item-section>
              </q-item>

              <q-separator></q-separator>

              <q-item clickable>
                <q-item-section>Preferences</q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-chevron-right"></q-icon>
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item v-for="n in 3" :key="n" dense clickable>
                      <q-item-section>Submenu Label</q-item-section>
                      <q-item-section side>
                        <q-icon name="mdi-chevron-right"></q-icon>
                      </q-item-section>
                      <q-menu auto-close anchor="top end" self="top start">
                        <q-list>
                          <q-item v-for="n in 3" :key="n" dense clickable>
                            <q-item-section>3rd level Label</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>

              <q-separator></q-separator>

              <q-item clickable v-close-popup @click="closeApp">
                <q-item-section>Quit</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <div class="q-ml-md cursor-pointer non-selectable q-electron-drag--exception">
          <!-- ANCHOR Edit -->
          Edit
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Cut</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Copy</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Paste</q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item clickable>
                <q-item-section>Select All</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="cursor-pointer gt-xs">View</div>
        <div class="cursor-pointer q-electron-drag--exception">
          Window
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable @click="openDevTool">
                <q-item-section>Open Dev Tool</q-item-section>
              </q-item>
              <!-- <q-item clickable>
                <q-item-section><router-link to="/test">TEST</router-link></q-item-section>
              </q-item> -->
            </q-list>
          </q-menu>
        </div>
        <div class="cursor-pointer q-electron-drag--exception">
          Help
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section><router-link to="/about">About</router-link></q-item-section>
              </q-item>
              <template v-if="!isPackaged()">
                <q-item clickable><q-item-section><router-link to="/test">TEST</router-link></q-item-section></q-item>
                <q-item clickable><q-item-section><router-link to="/test/a">TEST A</router-link></q-item-section></q-item>
              </template>
            </q-list>
          </q-menu>
        </div>
        <q-space></q-space>

        <q-btn dense flat icon="mdi-minus" @click="minimize"></q-btn>
        <q-btn dense flat icon="mdi-crop-square" @click="toggleMaximize"></q-btn>
        <q-btn dense flat icon="mdi-close" @click="closeApp"></q-btn>
      </q-bar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// We guard the Electron API calls with the optional chaining JS operator,
// but this is only needed if we build same app with other Quasar Modes
// as well (SPA/PWA/Cordova/SSR...)

export default {
  setup() {
    function isPackaged() {
      return window.myWindowAPI.isPackaged()
    }
    function minimize() {
      window.myWindowAPI?.minimize()
    }

    function toggleMaximize() {
      window.myWindowAPI?.toggleMaximize()
    }

    function closeApp() {
      window.myWindowAPI?.close()
    }

    function openDevTool() {
      window.myWindowAPI?.openDevTool()
    }

    return { minimize, toggleMaximize, closeApp, openDevTool, isPackaged }
  }
}
</script>
