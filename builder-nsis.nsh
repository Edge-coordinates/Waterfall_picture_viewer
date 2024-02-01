!macro preInit
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\W Veiwer"
    WriteRegExpandStr HkCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\W Veiwer"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\W Veiwer"
    WriteRegExpandStr HkCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\W Veiwer"
!macroend
